import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import { SearchProps } from 'antd/lib/input'
import { MSIcon } from '@/components'
import Search from '@/assets/icons/common/search.svg'
import Icon from '@ant-design/icons'
import styles from './index.less'

const svgProps = {
  width: '22px',
  height: '22px'
}

interface IProps extends SearchProps {
  value?: string
  onValueChange?(search: string): void
  onSearch?(search: string): void
  onClear?(): void
}

const MSSearch: React.FC<IProps> = props => {
  const { value = '', onValueChange, onSearch, onClear, style, ...restProps } = props
  const wrapStyle: React.CSSProperties = {
    float: 'right',
    width: 250,
    ...style
  }
  const [searchKey, setSearchKey] = useState<string>(value)
  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange(evt.target.value)
    } else {
      setSearchKey(evt.target.value)
    }

    if (evt.type === 'click' && evt.target.value === '') {
      // clear event
      if (onClear && props.value !== '') {
        // 保证 onClear 存在 且 初始值不为空时
        onClear()
      }
    }
  }
  const handleEnter = () => {
    if (onSearch) onSearch(searchKey)
  }

  useEffect(() => {
    if (searchKey !== value) {
      setSearchKey(value)
    }
  }, [value])

  return (
    <Input
      className={styles.ms_search}
      value={searchKey}
      onChange={handleInput}
      onPressEnter={handleEnter}
      style={wrapStyle}
      {...restProps}
      suffix={
        <Icon
          component={MSIcon(Search, svgProps)}
          style={{ cursor: 'pointer' }}
          onClick={handleEnter}
        />
      }
    />
  )
}

export default MSSearch
