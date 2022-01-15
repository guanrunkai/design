import React from 'react'
// import { CaretDownOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import styles from './index.less'

interface IDataItem {
  label: string
  value: string | number
  disabled?: boolean
}

interface IProps extends SelectProps<any> {
  title: string
  onChange: (value: Array<number | string>) => void
  data: IDataItem[]
  value: Array<number | string> | number
  onDropdownVisibleChange?: (open: boolean) => void
}

const { Option } = Select

const MSSelectGroup: React.FC<IProps> = ({
  title,
  data,
  value: oldValue,
  onChange: oldOnChange,
  ...props
}) => {
  // 全部
  const defaultValue: string | number = data[0] && data[0].value

  // 获取值。多选和单选的情况
  const values = Array.isArray(oldValue) ? (oldValue.length ? oldValue : [defaultValue]) : oldValue

  // 处理选中全部和其它选项的情况，若选中全部则不能选中其它，选中其它选项则去除全部选项
  const onChange = (value: any) => {
    if (Array.isArray(value)) {
      const v = value as number[]
      if (v[v.length - 1] !== defaultValue) {
        oldOnChange(v.filter(item => item !== defaultValue))
      } else {
        oldOnChange([defaultValue])
      }
    } else {
      oldOnChange(value)
    }
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <Select
        defaultValue={defaultValue}
        // suffixIcon={<CaretDownOutlined style={{ color: '#20a0ff' }} />}
        dropdownMatchSelectWidth={false}
        className={styles.content}
        {...props}
        onChange={onChange}
        value={values}
      >
        {data.map(({ label, value }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </div>
  )
}

export default MSSelectGroup
