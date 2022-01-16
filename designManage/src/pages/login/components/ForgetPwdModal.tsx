import React, { useState } from 'react'
import { Modal, Form, message } from 'antd'
import { MSForm } from '@/components'
import { IFormList } from '@moresec/react-components/dist/form/MSForm'
import { FORGET_PWD, RESET_PWD, useDispatch } from 'umi'
import { validatePassword, withEmpty } from '@/utils/validator'
import { Rule } from 'antd/lib/form'

const { useForm } = Form

interface IRule {
  [x: string]: Rule[]
}

const rules: IRule = {
  password: [{ validator: withEmpty(validatePassword) }]
}

interface IProps {
  children: React.ReactNode
}

const ForgetPwdModal = ({ children }: IProps) => {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(1)
  const dispatch = useDispatch()
  const [form] = useForm()
  const [uuid, setUuid] = useState('')

  const forgetFormList: IFormList[] = [
    {
      type: 'input',
      itemProps: {
        label: '用户名',
        name: 'username',
        rules: [{ required: true }]
      }
    },
    {
      type: 'input',
      itemProps: {
        label: '动态验证码',
        name: 'code',
        rules: [{ required: true }]
      }
    }
  ]

  const pwdFormList: IFormList[] = [
    {
      type: 'password',
      itemProps: {
        label: '新密码',
        name: 'password',
        rules: rules.password,
        validateFirst: true
      }
    },
    {
      type: 'password',
      itemProps: {
        label: '确认新密码',
        name: 'confirmPwd',
        dependencies: ['password'],
        rules: [
          {
            required: true,
            message: '请输入确认密码'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('两次密码不一致，请重新输入'))
            }
          })
        ],
        validateFirst: true
      }
    }
  ]

  const reset = () => {
    setVisible(false)
    setStep(1)
    setUuid('')
    form.resetFields()
  }

  const handleSubmit = (values: any) => {
    // 用户验证码登录
    if (step === 1) {
      dispatch({
        type: FORGET_PWD,
        payload: values,
        callback: (res: string) => {
          setUuid(res)
          setStep(2)
        }
      })
    }
    // 更新密码
    if (step === 2) {
      dispatch({
        type: RESET_PWD,
        payload: {
          ...values,
          uuid
        },
        callback: () => {
          reset()
          message.success('修改成功')
        }
      })
    }
  }

  const handleCancel = () => {
    reset()
  }

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>
      <Modal
        title={step === 1 ? '忘记密码' : '修改密码'}
        visible={visible}
        footer={null}
        maskClosable={false}
        destroyOnClose
      >
        <MSForm
          form={form}
          labelCol={{ span: 5 }}
          formList={step === 1 ? forgetFormList : pwdFormList}
          showSubmit
          showSubmitCenter
          onFinish={handleSubmit}
          onCancel={handleCancel}
          submitText={step === 1 ? '下一步' : '确认'}
        />
      </Modal>
    </>
  )
}
export default ForgetPwdModal
