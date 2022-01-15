import React, { useState } from 'react'
import { Select, Input } from 'antd'
import { OptionData } from 'rc-select/lib/interface'
import { SearchProps } from 'antd/lib/input'
import { CheckboxGroupProps } from 'antd/lib/checkbox'
import classNames from 'classnames'
import MSQuerySelect from './MSQuerySelect'
import MSQueryRadio from './MSQueryRadio'
import MSQueryDateRange from './MSQueryDateRange'
import MSQueryCheckbox from './MSQueryCheckbox'
import styles from './index.less'
import MSSearch from '../MSSearch'
import { EditTwoTone } from '@ant-design/icons'

const { Group, Search } = Input
const { Option } = Select

export type OptionsData = OptionData[] | Readonly<{ label: string; value: string | number }[]>

export type QueryType = 'select' | 'radio' | 'dateRange' | 'checkbox' | 'custom'
export type Condition<T extends QueryType> = T extends 'select'
  ? {
      defaultValue?: string | number
      options: OptionsData
      hideOptionAll?: boolean
      onChange: (...args: any[]) => void
      name?: string
      value?: string
      edit?: boolean
      itemProps?: {
        showSearch?: boolean
        width?: number
        [propName: string]: any
      }
    }
  : T extends 'radio'
  ? { defaultValue: string; options: OptionsData; onChange: (val: string) => void }
  : T extends 'dateRange'
  ? { defaultValue?: (string | undefined)[]; onChange: (...args: any[]) => void }
  : T extends 'checkbox'
  ? { defaultValue: CheckboxGroupProps['defaultValue']; onChange: CheckboxGroupProps['onChange'] }
  : T extends 'custom'
  ? { content: React.ReactNode }
  : {
      defaultValue: string
      options: OptionsData
      onChange: (...args: any[]) => void
      itemProps?: {
        showSearch?: boolean
        width?: number
        [propName: string]: any
      }
      content: React.ReactNode
    }

export type ICondition<T extends QueryType = 'select'> = {
  type?: T
  label?: React.ReactNode
  edit?: boolean
  handleEdit?(): void
} & Condition<T>

interface IProps extends React.Props<any> {
  conditions: ICondition<QueryType>[]
  searchOptions?: OptionsData
  searchProps?: SearchProps & {
    searchType?: string
    onSearchWithType?: (val: string, type: string) => void
  }
  buttonProps?: React.ReactNode
  className?: string
}

const MSQuery: React.FC<IProps> = props => {
  const { conditions, searchOptions, searchProps, buttonProps, className, children } = props
  const [currentSearchType, setCurrentSearchType] = useState<string>('')
  const { searchType = '', onSearchWithType, ...restSearchProps } = searchProps || {}
  const showSearchBox = !!searchProps

  const handleSearchTypeChange = (val: string) => {
    setCurrentSearchType(val)
  }

  const QueryNodes = conditions.map((condition, index) => {
    const { type = 'select', label, edit, handleEdit, ...restConditions } = condition

    const queryTypes: MS.objectAny = {
      select: <MSQuerySelect {...(restConditions as Condition<'select'>)} />,
      radio: <MSQueryRadio {...(restConditions as Condition<'radio'>)} />,
      dateRange: <MSQueryDateRange {...(restConditions as Condition<'dateRange'>)} />,
      checkbox: <MSQueryCheckbox {...(restConditions as Condition<'checkbox'>)} />,
      custom: (restConditions as Condition<'custom'>).content
    }

    return (
      <div key={index} className={styles.query_item}>
        {!!label && <span className={styles.label}>{label}</span>}
        {type ? queryTypes[type] : null}
        {edit && <EditTwoTone className={styles.edit_icon} onClick={handleEdit} />}
      </div>
    )
  })

  let SearchNode: React.ReactNode = null
  if (showSearchBox || buttonProps) {
    if (searchOptions && searchOptions.length > 0) {
      SearchNode = (
        <Group compact className={styles.search_group_wrapper}>
          <Select
            style={{ width: '120px' }}
            defaultValue={searchType}
            onChange={handleSearchTypeChange}
          >
            {searchOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
          <Search
            allowClear
            enterButton
            className={styles.search}
            style={{ width: 188 }}
            {...restSearchProps}
            onSearch={val => onSearchWithType && onSearchWithType(currentSearchType, val)}
          />
        </Group>
      )
    } else {
      SearchNode = (
        <div className={styles.search_wrapper}>
          <div className={styles.search_button}> {buttonProps}</div>
          {showSearchBox && <MSSearch {...searchProps} />}
        </div>
      )
    }
  }

  return (
    <div className={classNames(className, styles.query_container)}>
      {SearchNode}
      <div className={classNames(styles.query_wrapper, { [styles.with_search]: !!showSearchBox })}>
        {QueryNodes}
      </div>
      {children}
    </div>
  )
}

export default MSQuery
export { MSQuerySelect }
