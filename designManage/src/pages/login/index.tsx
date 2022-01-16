/* eslint-disable no-unused-expressions */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification } from 'antd'
import cookies from 'js-cookie'
import React, { useEffect, useRef, useState } from 'react'
import {
  CUSTOM_INFO,
  
  history,
  OTP_CODE,
  OTP_LOGIN,
  TO_LOGIN,
  useDispatch,
  
  useSelector
} from 'umi'

import type { IConnectState } from '@/models/connect'

// import Codebox from '@axetroy/react-codebox'
import CodeInput from './components/CodeInput'
import ForgetPwdModal from './components/ForgetPwdModal'
import styles from './styles/index.less'

const { Item } = Form

const selector = ({ login, loading, custom }: IConnectState) => ({
  login,
  loading: loading.effects[TO_LOGIN],
  custom
})

const Login = () => {
  const { login, loading, custom } = useSelector(selector)
  const { uuid, QRcode } = login
  // const { keyword } = custom
  const nameInputRef = useRef<Input>(null)
  const formRef = useRef<any>(null)

  const [showOtp, setShowOtp] = useState(false)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   // 获取关键词
  //   dispatch({ type: CUSTOM_INFO })
  //   // 用户信息清空
  //   dispatch({ type: USER_INFO_RESET })
  // }, [dispatch])

  // useEffect(() => {
  //   if (keyword) document.title = keyword
  // }, [keyword])

  useEffect(() => {
    if (!showOtp) {
      nameInputRef.current!.focus()
    }
  }, [showOtp])

  // useEffect(() => {
  //   if (cookies.get('token')) {
  //     history.replace('/')
  //   }
  // }, [])

  // const getOtpCode = (uid = uuid) => {
  //   if (!uid) return
  //   dispatch({
  //     type: OTP_CODE,
  //     payload: {
  //       uuid: uid
  //     },
  //     callback: () => {
  //       setShowOtp(true)
  //     }
  //   })
  // }

  const handleKeyDown = (e: any) => {
    if (showOtp && e.keyCode === 13) formRef.current.submit()
  }

  const onFinish = (values: any) => {
    if (showOtp) {
      // OTP 登录
      dispatch({
        type: OTP_LOGIN,
        payload: {
          uuid,
          ...values
        },
        callback: (res: string | boolean) => {
          // 提示登录信息
          if (res !== true) {
            notification.warning({
              message: '提示',
              description: res
            })
          }
          // // admin 用户登录成功，调用引擎是否离线接口
          // dispatch({ type: ENGINE_CHECK_ALIVE })
        }
      })
    } else {
      // 账号密码登录
      
      dispatch({
        type: TO_LOGIN,
        payload: values,
        callback:  ()=> {

          setShowOtp(true)
        }
      })
    }
  }

  return (
    <div className={styles.login_wrapper} onKeyDown={handleKeyDown}>
      <div className={styles.bg_group}>
        <div className={styles.form_wrapper}>
          <Form ref={formRef} className={styles.form} onFinish={onFinish}>
            {showOtp ? (
              <>
                
                <span className={styles.opt_title}>请输入动态验证码</span>
                <Item
                  name="otp"
                  className={styles.form_otp}
                  rules={[
                    { required: true, message: '请输入验证码' },
                    {
                      min: 6,
                      message: '请输入完整的6位口令'
                    }
                  ]}
                  validateTrigger="onBlur"
                >
                  <CodeInput />
                </Item>
                <Item>
                  <Button className={styles.submit} type="primary" htmlType="submit">
                    确定
                  </Button>
                </Item>
              </>
            ) : (
              <>
                {/* <div className={styles.logo}>
                  <img src="/home/moresec/dsmp/LOGINLOGO.png" alt="logo" />
                </div> */}
                <Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
                  <Input
                    ref={nameInputRef}
                    prefix={
                      <UserOutlined style={{ color: '#999', fontSize: 14, marginRight: 8 }} />
                    }
                    placeholder="请输入用户名"
                    spellCheck="false"
                  />
                </Item>
                <Item noStyle>
                  <Item
                    name="password"
                    required
                    rules={[{ required: true, message: '请输入密码' }]}
                  >
                    <Input
                      prefix={
                        <LockOutlined style={{ color: '#999', fontSize: 14, marginRight: 8 }} />
                      }
                      type="password"
                      placeholder="请输入密码"
                    />
                  </Item>

                  <ForgetPwdModal>
                    <a className={styles.forget_pwd}>忘记密码</a>
                  </ForgetPwdModal>
                </Item>
                <Item className={styles.submit_item}>
                  <Button
                    className={styles.submit}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    登录
                  </Button>
                </Item>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
