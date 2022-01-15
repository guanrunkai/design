import React, { useEffect } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { AlertTwoTone } from '@ant-design/icons'
import styles from '../styles/ErrorFallback.less'
// import { history } from 'umi'

const ErrorFallback = (props: FallbackProps) => {
  const { error } = props

  useEffect(() => {
    window.hasError = true
    console.log('error: ', error)
  }, [error])

  // const returnHome = () => {
  //   history.replace('/login')
  // }

  return (
    <div className={styles.error_wrapper}>
      <AlertTwoTone twoToneColor="#ff1939" />
      <div>此页面出错了！请联系管理员。</div>
      {/* <Button type="link" onClick={returnHome}>
        返回
      </Button> */}
    </div>
  )
}

export default ErrorFallback
