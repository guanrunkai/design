import React, { useEffect } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { AlertTwoTone } from '@ant-design/icons'
import styles from '../styles/ErrorFallback.less'

const ErrorFallback = (props: FallbackProps) => {
  const { error } = props

  useEffect(() => {
    window.hasError = true
    console.log('error: ', error)
  }, [error])

  return (
    <div className={styles.error_wrapper}>
      <AlertTwoTone twoToneColor="#ff1939" style={{ fontSize: 40 }} />
      <div>此页面出错了！请联系管理员。</div>
    </div>
  )
}

export default ErrorFallback
