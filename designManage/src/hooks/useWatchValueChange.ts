import { useEffect } from 'react'
import { useToggle } from './index'
import { isEmpty } from '@/utils/common'

interface Options {
  notEmpty: boolean
  once: boolean
}

interface WatchValueChangeConfig {
  target: any
  options?: Options
  callback(value: any): any
}

const defaultOptions = { notEmpty: true, once: true }

export default function useWatchValueChange({
  target,
  callback,
  options = defaultOptions
}: WatchValueChangeConfig) {
  const { notEmpty, once } = options
  const [targetChangedFlag, { setTrue: setTargetHasChanged }] = useToggle(false)

  useEffect(() => {
    if (targetChangedFlag && once) return
    if (!notEmpty || (notEmpty && !isEmpty(target))) {
      callback(target)
      once && setTargetHasChanged()
    }
  }, [target, targetChangedFlag, setTargetHasChanged, notEmpty, callback, once])
}
