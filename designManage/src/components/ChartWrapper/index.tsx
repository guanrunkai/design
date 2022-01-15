import React from 'react'
import styles from './index.less'

interface IProps {
  title: string
  extra?: React.ReactNode
}

const ChartWrapper: React.FC<IProps> = props => {
  const { title, extra, children } = props
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>{title}</span>
        {extra || null}
      </div>
      {children}
    </div>
  )
}

export default ChartWrapper
