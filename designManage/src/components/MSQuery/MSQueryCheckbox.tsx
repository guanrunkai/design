import React from 'react'
import { Checkbox } from 'antd'
// import RiskIcon from '@/components/RiskIcon'
import { MAP_LEVELS } from '@/utils/constant'
import { Condition } from './index'
import styles from './index.less'

const { Group } = Checkbox

const MSQueryCheckbox: React.FC<Condition<'checkbox'>> = props => {
  const { defaultValue, onChange } = props

  return (
    <div className={styles.wrapper}>
      <Group defaultValue={defaultValue} className={styles.checkbox_risk} onChange={onChange}>
        {Object.keys(MAP_LEVELS).map((item, index) => {
          return (
            <Checkbox key={index} className={styles.checkbox_item} value={item}>
              {/* <RiskIcon level={item} /> */}
              <span> {MAP_LEVELS[item]} </span>
            </Checkbox>
          )
        })}
      </Group>
    </div>
  )
}

export default MSQueryCheckbox
