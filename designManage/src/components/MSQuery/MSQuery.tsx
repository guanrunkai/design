import React from 'react'
import { Select, Input, Radio } from 'antd'
import { SelectProps, OptionProps, SelectValue } from 'antd/lib/select'
import { SearchProps } from 'antd/lib/input'
import classNames from 'classnames'
import styles from './index.less'

const { Search } = Input
const { Option } = Select

interface ICondition<T = any> {
  label?: string | React.ReactNode
  defaultValue?: SelectValue
  options?: OptionProps[]
  onChange?: (value: T) => void
  custom?: boolean | string
  content?: React.ReactNode
  itemProps?: {
    showSearch?: boolean
    width?: number
    [propName: string]: any
  }
}
interface IProps extends React.Props<any> {
  conditions: ICondition[]
  search?: boolean
  searchProps?: SearchProps
  className?: string
}

const filterSelectOptions: SelectProps['filterOption'] = (input, option) =>
  option.props.children!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0

const MSQuery: React.FC<IProps> = props => {
  const { conditions, search, searchProps, className, children } = props
  const showSearchBox = !!search

  const queryNodes = conditions.map((condition, index) => {
    const {
      label,
      defaultValue = '',
      options = [],
      onChange,
      custom = 'select',
      content,
      itemProps
    } = condition
    const { showSearch = false, width = 128, ...restItemProps } = itemProps || {}
    let queryItemNode = null

    switch (custom) {
      case 'select':
        queryItemNode = (
          <Select
            showSearch={showSearch}
            value={defaultValue}
            style={{ width }}
            onChange={onChange}
            filterOption={filterSelectOptions}
            {...restItemProps}
          >
            {options.map(({ title, value }, i) => (
              <Option key={i} value={value}>
                {title}
              </Option>
            ))}
          </Select>
        )
        break
      case 'radio':
        queryItemNode = (
          <Radio.Group
            defaultValue={defaultValue}
            buttonStyle="solid"
            onChange={e => onChange && onChange(e.target.value)}
          >
            {options.map(({ title, value }) => (
              <Radio.Button key={value} value={value}>
                {title}
              </Radio.Button>
            ))}
          </Radio.Group>
        )
        break
      case true:
        queryItemNode = content
        break
      default:
        throw Error(`请检查 conditions 中 ${label} 项参数的合法性`)
    }

    if (!queryItemNode) return null

    return (
      <div key={index} className={styles.query_item}>
        {!!label && <span className={styles.label}>{label}</span>}
        {queryItemNode}
      </div>
    )
  })

  return (
    <div className={classNames(className, styles.query_container)}>
      {children}
      {showSearchBox && (
        <Search
          allowClear
          className={styles.search}
          style={{ width: 200, float: 'right' }}
          {...searchProps}
        />
      )}
      <div className={classNames(styles.query_wrapper, { [styles.with_search]: !!showSearchBox })}>
        {queryNodes}
      </div>
    </div>
  )
}

export default MSQuery
