/* eslint-disable react/forbid-dom-props */
import * as React from 'react'
import { Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'

export type MSButtonGroupComponent<P> = React.FC<P>
export type Value = string | number | string[] | number[]
export interface DataItem {
  label: string
  value: Value
  disabled?: boolean
}
export interface IProps {
  title?: string
  data: DataItem[]
  value?: Value
  onChange(value: Value): void
}

const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const MSButtonGroup: MSButtonGroupComponent<IProps> = ({ title, data, onChange, ...props }) => {
  const handleChange = (evt: RadioChangeEvent) => {
    onChange(evt.target.value)
  }
  return (
    <div style={{ marginRight: '20px', display: 'inline-block' }}>
      <span style={{ marginRight: '10px' }}>{title}</span>
      <RadioGroup
        defaultValue={data[0].value}
        buttonStyle="solid"
        onChange={handleChange}
        {...props}
      >
        {data.map(({ label, value }) => (
          <RadioButton key={label} value={value}>
            {label}
          </RadioButton>
        ))}
      </RadioGroup>
    </div>
  )
}

export default MSButtonGroup
