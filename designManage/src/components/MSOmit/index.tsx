import React from 'react'
import { Tooltip } from 'antd'
import styles from './index.less'

interface IProps {
  content: React.ReactNode
  hide?: boolean
}

const MSOmit: React.FC<IProps> = ({ content, hide }) => {
  return !hide ? (
    <Tooltip placement="bottom" title={content} color="#fff" overlayInnerStyle={{ color: '#333' }}>
      <span className={styles.omit}>...</span>
    </Tooltip>
  ) : null
}

export default MSOmit
