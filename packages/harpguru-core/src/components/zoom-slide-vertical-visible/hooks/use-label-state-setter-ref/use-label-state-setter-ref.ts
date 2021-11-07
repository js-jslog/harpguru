import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'

import { getWithSnapProps } from '../../utils'

export const useLabelStateSetterRef = (
  slideOffset: number,
  trackLength: number,
  slotCount: number
): MutableRefObject<(arg0: number) => void> => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const labelStateSetterRef = useRef<(arg0: number) => void>(() => {})

  useEffect(() => {
    const { withSnapIndex } = getWithSnapProps(
      slideOffset,
      trackLength,
      slotCount
    )

    labelStateSetterRef.current(withSnapIndex)
  }, [])

  return labelStateSetterRef
}
