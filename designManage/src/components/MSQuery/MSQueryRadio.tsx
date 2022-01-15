import React from 'react'
import { Radio } from 'antd'
import { Condition } from './index'
import styles from './index.less'

const MSQueryRadio: React.FC<Condition<'radio'>> = props => {
  const { defaultValue, options = [], onChange = () => void 0 } = props

  return (
    <Radio.Group
      className={styles.radio_wrapper}
      defaultValue={defaultValue}
      buttonStyle="solid"
      onChange={e => onChange(e.target.value)}
    >
      {options.map(({ label, value }) => (
        <Radio.Button key={value} value={value}>
          {label}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
}

export default MSQueryRadio
