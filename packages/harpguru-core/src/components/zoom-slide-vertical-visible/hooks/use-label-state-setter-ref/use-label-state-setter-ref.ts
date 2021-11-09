import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'

export const useLabelStateSetterRef = (
  columnBounds: readonly [number, number]
): MutableRefObject<(arg0: readonly [number, number]) => void> => {
  /* eslint-disable @typescript-eslint/no-empty-function */
  const labelStateSetterRef = useRef<(arg0: readonly [number, number]) => void>(
    () => {}
  )
  /* eslint-enable @typescript-eslint/no-empty-function */

  useEffect(() => {
    labelStateSetterRef.current(columnBounds)
  }, [])

  return labelStateSetterRef
}
