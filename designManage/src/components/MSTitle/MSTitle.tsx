import React from 'react'
import styles from './index.less'
import classnames from 'classnames'
import { Button, Divider } from 'antd'
import { history } from 'umi'

interface IProps extends React.Props<any> {
  title?: React.ReactNode
  back?: boolean
  hideBorder?: boolean
  size?: 'default' | 'large'
  style?: React.CSSProperties
  extra?(): React.ReactNode
}

const MSTitle: React.FC<IProps> = props => {
  const { title, extra, style = {}, size, hideBorder = false, children, back, ...restProps } = props
  const wrapperStyle = Object.assign(
    {},
    {
      color: '#20a0ff',
      borderBottom: hideBorder ? 'none' : '1px solid #20a0ff',
      padding: size === 'large' ? '0 0 14px' : '16px 0',
      marginBottom: 20,
      lineHeight: size === 'large' ? '20px' : '25px',
      fontSize: 18
    },
    style
  )
  return (
    // eslint-disable-next-line react/forbid-dom-props
    <div style={wrapperStyle} {...restProps} className="ms-title">
      {back && (
        <>
          <Button type="link" style={{ padding: 0, height: 20 }} onClick={() => history.goBack()}>
            返回
          </Button>
          <Divider type="vertical" />
        </>
      )}
      <span className={classnames(styles.title, size === 'large' ? styles.large : void 0)}>
        {title}
      </span>
      {extra && extra()}
      {children}
    </div>
  )
}

export default MSTitle
