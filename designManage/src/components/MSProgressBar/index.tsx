/* eslint-disable react/forbid-dom-props */
import React from 'react'
import { Popover } from 'antd'
import { PopoverProps } from 'antd/lib/popover'
import styles from './index.less'
import classnames from 'classnames'

interface IProgressItem {
  name: string
  value: number
  color: string
}

interface IProps {
  data: IProgressItem[]
  showName?: boolean
  isList?: boolean
  showTip?: boolean | PopoverProps
  wrapperStyle?: React.CSSProperties
}

const MSProgressBar: React.FC<IProps> = ({
  data = [],
  showName = false,
  isList = false,
  showTip = false,
  wrapperStyle
}) => {
  const sum = data.reduce((cur, next) => cur + next.value, 0)

  if (data.length === 0 && sum === 0) {
    return <div className={styles.wrapper} />
  }

  let current = 0
  const formatedData = data.map(({ name, value, color }) => {
    current += value
    return { name, value, color, percent: sum === 0 ? 0 : (current / sum) * 100 }
  })

  const renderNode = (
    <div className={styles.wrapper} style={wrapperStyle}>
      <div className={styles.innerWrapper}>
        <div className={classnames(styles.item, styles.background)} />
        {[...formatedData].reverse().map(({ name, percent, color }) => (
          <div
            key={name}
            className={styles.item}
            style={{ width: `${percent}%`, backgroundColor: color }}
          />
        ))}
      </div>
      <div
        className={styles.info}
        style={{ justifyContent: formatedData.length === 1 ? 'center' : 'space-between' }}
      >
        {formatedData.map(({ name, value, color }) => (
          <div className={styles.infoItem} key={name}>
            <div style={{ color: color, lineHeight: isList ? '18px' : '20px' }}>{value}</div>
            {showName && <div className={styles.name}>{name}</div>}
          </div>
        ))}
      </div>
    </div>
  )

  if (showTip) {
    const popoverProps = showTip === true ? {} : showTip
    const popoverContent = (
      <ul>
        {formatedData.map(item => (
          <li key={item.name} className={styles.contentItem}>
            <i style={{ background: item.color }} />
            <span>
              {item.name}：{item.value}
            </span>
          </li>
        ))}
      </ul>
    )
    return (
      <Popover content={popoverContent} placement="bottomRight" {...popoverProps}>
        {renderNode}
      </Popover>
    )
  }

  return renderNode
}

export default MSProgressBar
