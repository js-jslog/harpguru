import { useRef, useEffect } from 'react'

export const usePrevious = <T>(value: T, initial: T): T => {
  const ref = useRef(initial)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
