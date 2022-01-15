import React from 'react'
import Image500 from '@/assets/images/error/500.png'
import styles from './index.less'

const ServerInternalError = () => (
  <div className={styles.wrapper}>
    <img src={Image500} alt="Server internal error" />
    <div className={styles.desc}>抱歉，服务器内部出错了123asderr......</div>
  </div>
)

export default ServerInternalError
