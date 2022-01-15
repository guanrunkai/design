import React, { FC, useEffect, useRef } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect, history } from 'umi'
import { IConnectProps, IConnectState } from '@/models/connect'
import LoginLogoImg from '@/assets/images/login_logo.png'
import styles from './styles/index.less'

const { Item } = Form

const GET_VERIFICATION_CODE = 'login/getCode'
const TO_LOGIN = 'login/login'

const Login: FC<IConnectProps> = props => {
  const { login, dispatch, loading } = props
  const { code } = login
  const nameInputRef = useRef<Input>(null)

  const getCode = () => {
    dispatch({
      type: GET_VERIFICATION_CODE
    })
  }

  useEffect(() => {
    getCode()
    nameInputRef.current!.focus()
  }, [])

  const onFinish = (values: any) => {
    // dispatch({
    //   type: TO_LOGIN,
    //   payload: values,
    //   callback: getCode
    // })
    if (values.user_name === 'grk' && values.password === '123456Qq') {
      history.push(`/dashboard`)
    }
  }

  return (
    <div className={styles.login_wrapper}>
      <div className={styles.form_wrapper}>
        <Form className={styles.form} onFinish={onFinish}>
          <div className={styles.logo}>
            <img src={LoginLogoImg} alt="logo" />
          </div>
          <Item name="user_name" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input ref={nameInputRef} prefix={<UserOutlined />} placeholder="用户名" />
          </Item>
          <Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
          </Item>
          {/* <Item
            name="verification_code"
            validateTrigger="onBlur"
            rules={[{ required: true, len: 4, message: '请输入4位长度的验证码' }]}
          >
            <div className={styles.code_wrapper}>
              <Input className={styles.code_input} placeholder="验证码" />
              <img
                src={code}
                alt="验证码"
                title="点击重新获取"
                className={styles.code}
                onClick={getCode}
              />
            </div>
          </Item> */}
          <Item>
            <Button className={styles.submit} type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  )
}

export default connect(({ login, loading }: IConnectState) => ({
  login,
  loading: loading.effects[TO_LOGIN]
}))(Login)
