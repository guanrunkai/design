import * as React from 'react'
import { Divider } from 'antd'
import { DividerProps } from 'antd/lib/divider'

const MSDivider: React.FC<DividerProps> = props => {
  return <Divider type="vertical" style={{ background: '#20a0ff' }} {...props} />
}

export default MSDivider
