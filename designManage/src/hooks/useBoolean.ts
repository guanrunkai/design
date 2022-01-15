import { useState, useMemo } from 'react'

interface Action {
  /** state 置反 */
  toggle(): void
  /** state 设置为 true */
  setTrue(): void
  /** state 设置为 false */
  setFalse(): void
}

/**
 * 管理 boolean 类型的值，可用于控制元素的 显示/隐藏，modal 的 弹出/隐藏 等
 * @param defaultValue 初始值，默认是 false
 * @returns result.state - 当前状态
 * @returns result.action - 对 state 的操作
 * @returns action.toggle - state 置反
 * @returns action.setTrue - state 设置为 true
 * @returns action.setFalse - state 设置为 false
 */
function useBoolean(defaultValue = false): [boolean, Action] {
  const [state, setState] = useState<boolean>(defaultValue)

  const actions = useMemo(
    () => ({
      setTrue: () => setState(true),
      setFalse: () => setState(false),
      toggle: () => setState(prev => !prev)
    }),
    [setState]
  )

  return [state, actions]
}

export default useBoolean
