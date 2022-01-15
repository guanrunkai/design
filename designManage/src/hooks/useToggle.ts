import { useState } from 'react'

interface Action {
  toggle(_toggle?: boolean): void
  setTrue(): void
  setFalse(): void
}

function useToggle(defaultValue = false): [boolean, Action] {
  const [state, setState] = useState<boolean>(defaultValue)

  const setTrue = () => setState(true)

  const setFalse = () => setState(true)

  const toggle = (_toggle?: boolean) => {
    if (typeof _toggle === 'boolean') {
      setState(_toggle)
    } else {
      setState(prev => !prev)
    }
  }

  return [state, { toggle, setTrue, setFalse }]
}

export default useToggle
