import React from 'react'

interface IProps {
  width?: string
}

const NoAccessButton: React.FC<IProps> = ({ width = '2em' }) => {
  // eslint-disable-next-line react/forbid-dom-props
  return <a style={{ display: 'inline-block', width, textAlign: 'center' }}>-</a>
}

export default NoAccessButton
