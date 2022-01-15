import React, { useState } from 'react'
import { Select } from 'antd'
import { MAP_LEVELS, MAP_MAP_LEVELS, T_MAP_MAP_LEVELS } from '@/utils/constant'

const Dashboard: React.FC = () => {
  const [value, setValue] = useState<T_MAP_MAP_LEVELS>('')
  return (
    <div>
      <div>Dashboard</div>
      <Select
        options={MAP_LEVELS}
        style={{ width: '180px' }}
        onChange={(val: T_MAP_MAP_LEVELS) => setValue(val)}
      />
      <div>当前选中值: {MAP_MAP_LEVELS[value]} </div>
    </div>
  )
}

export default Dashboard
