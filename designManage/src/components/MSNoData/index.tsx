import * as React from 'react'
import { Empty } from 'antd'
import { EmptyProps } from 'antd/lib/empty'
import Icon from '@ant-design/icons'
import NoDataSvg from '@/assets/icons/common/no_data.svg'
import styles from './index.less'

interface IProps extends EmptyProps {
  height?: number
  iconsize?: string
  title?: string
}

const MSNoData = (NoDataProps: IProps) => {
  const { height = 260, iconsize = '108px', title, ...restProps } = NoDataProps
  return (
    /* eslint-disable react/forbid-dom-props */
    <>
      <span className={styles.empty_title}>{title}</span>
      <div className={styles.none_data} style={{ height: height }}>
        <Empty
          image={<Icon component={NoDataSvg} style={{ fontSize: iconsize }} />}
          {...restProps}
        />
      </div>
    </>
  )
}

export default MSNoData
