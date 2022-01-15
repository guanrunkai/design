import React from 'react'
import styles from './index.less'
import { CaretDownOutlined } from '@ant-design/icons'
import classnames from 'classnames'

interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  expandText?: string
  foldText?: string
  hasExpanded: boolean
  disabled?: boolean
  toggleExpand?(): void
}

const MSTableExpand: React.FC<IProps> = ({
  expandText = '',
  foldText = '收回详情',
  hasExpanded,
  disabled = false,
  toggleExpand,
  ...restProps
}) => {
  const handleClick = () => toggleExpand && toggleExpand()
  const expandCls = classnames(styles.expandBtn, { [styles.disabled]: disabled })
  const cls = classnames('sdl-reverse', { reversed: hasExpanded })
  return (
    <span className={expandCls} onClick={handleClick} {...restProps}>
      {hasExpanded ? foldText : expandText}
      <CaretDownOutlined className={cls} style={{ marginLeft: 6 }} />
    </span>
  )
}

export default MSTableExpand
