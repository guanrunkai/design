import React from 'react'
import { Spin } from 'antd'
export default () => {
  return (
    <div
      // eslint-disable-next-line react/forbid-dom-props
      style={{
        height: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Spin size="large" />
    </div>
  )
}
