import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import styles from './index.less'

export interface CodeInputProps {
  inputType?: string
  length?: number
  showCursor?: boolean
  onChange?: (code: string) => void
  onFinish?: (...args: any) => void
}

const onItemChange = () => {
  /*
  使用 onChange input输入了和上一次相同的值将无法跳转下一个input
  所以使用了 onInput

  使用了value而不使用defaultValue是为了防止粘贴检验规则之外的字符显示下input中

  由此必须使用 onChange 不然报错如下
  Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
   */
  return false
}

// 清除默认行为
const removeDefaultBehavior = (event: Event) => {
  if (event.preventDefault) event.preventDefault() // 标准技术
  // 阻止事件冒泡
  if (event.stopPropagation) {
    event.stopPropagation()
  }
  return false // 用于处理使用对象属性注册的处理程序
}

// 聚焦文本
// const textSelect = (tempElement: any) => {
//   const start = 0
//   const end = tempElement.value.length
//   tempElement.setSelectionRange(start, end)
//   tempElement.focus()
// }

// 字符串数组转数字
const handleStringToNumber = (codeArr: string[]) => {
  const tempArr = codeArr.filter(s => s !== '')
  return tempArr.join('')
}

// 校验是否为数字
const isNumber = (input: string) => {
  return /\d/.test(input)
}

const CodeInput = (props: CodeInputProps) => {
  const { length = 6, inputType = 'input', showCursor = true, onChange, onFinish } = props
  const [codeList, setCodeList] = useState(new Array(length).fill(''))
  const domList = useMemo(() => new Array(length), [length])

  const setSingleValue = (value: string, i: number) =>
    setCodeList(pre => {
      pre[i] = value
      return [...pre]
    })

  const onInput = (value: string, i: number) => {
    if (codeList[i]) return
    // 校验是否为数字
    if (value !== '' && !isNumber(value)) {
      setSingleValue('', i)
      return
    }

    setSingleValue(value, i)

    value && i !== length && focusOn(i + 1)

    return codeList
  }

  useEffect(() => {
    if (typeof onChange === 'function') {
      // input都不为空时不再聚焦input
      if (codeList.every(v => v !== '')) {
        onFinish && onFinish()
        // e.target.blur()
      }

      onChange(handleStringToNumber(codeList))
    }
  }, [codeList, onChange, onFinish])

  //  粘贴格式校验
  const handleClipboardDatacode = (str: string) => {
    // const tempstr = `${parseInt(str)}`
    // if (str.length !== length || tempstr.length !== length) message.error('粘贴格式错误')
    // else {
    //   setCodeList(str.split(''))
    //   onChange && onChange(str)
    //   focusOn(length - 1)
    // }
    setCodeList(str.substring(0, 6).split(''))
    onChange && onChange(str)
    focusOn(length - 1)
  }

  // 聚焦
  const focusOn = useCallback(
    (i: number) => {
      const tempElement = domList[i]
      if (tempElement) {
        tempElement.focus()
      }
    },
    [domList]
  )
  // 聚焦并清空数据
  const focusClearOn = (i: number) => {
    const tempElement = domList[i]
    if (tempElement) {
      tempElement.value = ''
      setSingleValue('', i)
      tempElement.focus()
    }
  }

  // 获取上一个或者下一个input，判断是否存在
  const getPrevBox = (i: number): boolean => {
    return !!domList[i - 1]
  }
  const getNextBox = (i: number): boolean => {
    return !!domList[i + 1]
  }

  const onKeyDown = (e: any, i: number) => {
    // const inputElement = e.target
    switch (e.keyCode) {
      case 8: // 删除完之后，退回到上一个输入框
        setSingleValue('', i)
        if (e.target!.value === '') {
          // 如果空的话，那么就退回到上一个输入框
          removeDefaultBehavior(e)
          focusClearOn(i - 1)
        }
        break
      case 37: // 左
      case 38: // 上
        removeDefaultBehavior(e)
        if (getPrevBox(i)) {
          focusOn(i - 1)
        } else {
          focusOn(i)
        }
        break
      case 39: // 右
      case 40: // 下
        removeDefaultBehavior(e)
        if (getNextBox(i)) {
          focusOn(i + 1)
        } else {
          focusOn(i)
        }
        break
      default:
      // 不管你输入什么
      // 都会聚焦文本
      // textSelect(inputElement)
    }
  }

  useEffect(() => {
    focusOn(0)
  }, [focusOn])

  return (
    <div className={styles.codebox_container}>
      {[...domList].map((_, i) => (
        <div key={i} className={styles.codebox_field_wrap}>
          <input
            type={inputType}
            autoComplete="false"
            autoCorrect="off"
            autoCapitalize="off"
            maxLength={1}
            spellCheck="false"
            onPaste={e => {
              handleClipboardDatacode(e.clipboardData.getData('text'))
            }}
            value={codeList[i]}
            ref={dom => (domList[i] = dom)}
            // onFocus={e => textSelect(e.target)}
            // onClick={e => textSelect(e.target)}
            onInput={(e: any) => onInput(e.target.value, i)}
            onChange={onItemChange}
            onKeyDown={e => onKeyDown(e, i)}
            className={classNames({ [styles['hidden-cursor']]: !showCursor })}
          />
        </div>
      ))}
    </div>
  )
}

export default CodeInput
