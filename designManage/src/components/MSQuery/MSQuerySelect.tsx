import React from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { Condition } from './index'

const { Option } = Select

const filterSelectOptions: SelectProps<any>['filterOption'] = (input, option) => {
  return option!.props.children!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const MSQuerySelect: React.FC<Condition<'select'>> = props => {
  const {
    defaultValue,
    options = [],
    name = 'label',
    value = 'value',
    hideOptionAll = false,
    onChange = () => void 0,
    itemProps
  } = props
  const { showSearch = true, width = 136, ...restItemProps } = itemProps || {}

  return (
    <Select
      showSearch={showSearch}
      value={defaultValue}
      style={{ width }}
      onChange={onChange}
      filterOption={filterSelectOptions}
      {...restItemProps}
    >
      {!hideOptionAll && (
        <Option key="" value="">
          全部
        </Option>
      )}
      {options.map((option_item, i) => (
        <Option key={i} value={option_item[value]}>
          {option_item[name]}
        </Option>
      ))}
    </Select>
  )
}

export default MSQuerySelect
