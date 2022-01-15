import React from 'react'
import { CaretLeftOutlined } from '@ant-design/icons'
import { history } from 'umi'
import classnames from 'classnames'
import styles from './index.less'

interface IProps {
  title?: string | React.ReactNode
  back?: boolean
  extra?: string | React.ReactNode
  describe?: string
  className?: string
  titleClass?: string
}
const MSPageTitle: React.FC<IProps> = props => {
  const { title, back = false, extra, describe, className, titleClass = 'page_name' } = props
  const goBack = () => {
    history.go(-1)
  }
  const pageTitleClass = classnames(styles.page_title, className)
  return (
    <div className={pageTitleClass}>
      {back ? (
        <span className={styles.page_back} onClick={goBack}>
          <CaretLeftOutlined />
          返回
        </span>
      ) : null}
      <span className={styles[titleClass]}>
        {title}
        <span className={styles.describe}>{describe}</span>
      </span>
      {extra || null}
    </div>
  )
}

export default MSPageTitle
