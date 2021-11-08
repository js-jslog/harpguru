import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'

export const useLabelStateSetterRef = (
  slotIndex: number
): MutableRefObject<(arg0: number) => void> => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const labelStateSetterRef = useRef<(arg0: number) => void>(() => {})

  useEffect(() => {
    labelStateSetterRef.current(slotIndex)
  }, [])

  return labelStateSetterRef
}
