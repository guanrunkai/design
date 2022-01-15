import React from 'react'
import Image404 from '@/assets/images/error/404.png'
import styles from './index.less'

const NotFound = () => (
  <div className={styles.wrapper}>
    <img src={Image404} alt="not found" />
    <div className={styles.desc}>抱歉，页面不存在...</div>
  </div>
)

export default NotFound
