import { useRef } from 'react'

export type CompareFn<T> = (prev: T | undefined, next: T) => boolean

function usePrevious<T>(state: T, compareFn?: CompareFn<T>): T | undefined {
  const prevRef = useRef<T>()
  const curRef = useRef<T>()

  const needUpdate = typeof compareFn === 'function' ? compareFn(curRef.current, state) : true
  if (needUpdate) {
    prevRef.current = curRef.current
    curRef.current = state
  }

  return prevRef.current
}

export default usePrevious
