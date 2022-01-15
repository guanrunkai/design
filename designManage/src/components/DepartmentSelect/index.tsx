import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { QUERY_DEPARTMENT_LIST, useDispatch, useSelector } from 'umi'
import { IConnectState } from '@/models/connect'

// type IProps = ReturnType<typeof mapStateToProps> & {
//   defaultValue?: number | string
//   showOptionAll?: boolean
//   width?: number | string
//   disabled?: boolean
//   onChange: (value: number) => void
// }
interface IProps {
  defaultValue?: number | string
  showOptionAll?: boolean
  width?: number | string
  disabled?: boolean
  onChange: (value: number) => void
}

const { Option } = Select

const filterSelectOptions: SelectProps<any>['filterOption'] = (input, option) => {
  return option!.label!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const selector = ({ global }: IConnectState) => ({ global })

const DepartmentSelect: React.FC<IProps> = props => {
  const dispatch = useDispatch()
  const { global } = useSelector(selector)

  const { showOptionAll = false, width = 180, disabled = false, onChange } = props
  let { defaultValue } = props // defaultValue 不为 ''，才会让 Select 显示 placeholder
  if (showOptionAll && !defaultValue) defaultValue = ''
  const [value, setValue] = useState<number>(defaultValue as number)

  useEffect(() => {
    dispatch({
      type: QUERY_DEPARTMENT_LIST
    })
  }, [dispatch])

  useEffect(() => {
    setValue(defaultValue as number)
  }, [defaultValue])

  const handleChange = (v: number) => {
    setValue(v)
    onChange(v)
  }

  return (
    <Select
      showSearch
      value={value}
      style={{ width }}
      onChange={handleChange}
      filterOption={filterSelectOptions}
      optionLabelProp="label"
      placeholder="请选择部门"
      disabled={disabled}
    >
      {showOptionAll && (
        <Option key="" value="" label="全部">
          全部
        </Option>
      )}
      {global.departmentList.map(({ id, name, level = 1 }) => (
        <Option key={id} value={id} label={name}>
          {/* eslint-disable-next-line react/forbid-dom-props */}
          <span style={{ paddingLeft: `${14 * (level - 1)}px` }}>{name}</span>
        </Option>
      ))}
    </Select>
  )
}

export default DepartmentSelect
