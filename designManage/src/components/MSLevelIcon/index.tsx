import React, { FC, ReactNode } from 'react'
import Icon from '@ant-design/icons'
import styles from './index.less'
import { MSIcon } from '@/components'
import RiskLevelSVG from '@/assets/icons/common/risk_level.svg'
import LeakLevelSVG from '@/assets/icons/common/leak_level.svg'
import { MAP_RISK_LEVEL_COLOR } from '@/utils/constant'
import { Popover } from 'antd'

interface IProps {
  type?: 'risk' | 'leak'
  level: string | number
  popoverContent?: ReactNode
}

const MAP_LEVEL_ICON = {
  risk: RiskLevelSVG,
  leak: LeakLevelSVG
}

const MSLevelIcon: FC<IProps> = ({ type = 'risk', level, children, popoverContent }) => {
  const iconProps = { width: '20px', height: '20px', color: MAP_RISK_LEVEL_COLOR[level] }

  const content = (
    <div className={styles.riskIconWrapper}>
      <Icon component={MSIcon(MAP_LEVEL_ICON[type], iconProps)} />
      {children}
    </div>
  )

  return popoverContent ? (
    <Popover placement="right" content={level}>
      {content}
    </Popover>
  ) : (
    content
  )
}

export default MSLevelIcon
