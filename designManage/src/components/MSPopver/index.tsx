import React from 'react'
import { Tooltip } from 'antd'
import { AbstractTooltipProps } from 'antd/es/tooltip'

interface IProps {
  text: string
  maxLen?: number
  tooltip?: AbstractTooltipProps
}

/**
 * 文字超出长度省略显示
 * @params props
 * @property {string} text 文本内容
 * @property {number} maxLen 内容最最长显示长度
 * @property {TooltipProps} tooltip Tooltip 属性
 * @returns {React.ReactNode}
 */
const MSPopver = ({ text, maxLen = 10, tooltip }: IProps) => {
  return (
    <>
      <span>
        {text.length <= maxLen ? (
          <span>{text}</span>
        ) : (
          <Tooltip title={text} {...tooltip}>
            <span>{`${text.slice(0, maxLen)}...`}</span>
          </Tooltip>
        )}
      </span>
    </>
  )
}
export default MSPopver
