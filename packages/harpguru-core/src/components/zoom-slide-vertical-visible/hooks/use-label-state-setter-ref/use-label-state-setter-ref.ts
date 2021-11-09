import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'

export const useLabelStateSetterRef = (
  trackBounds: readonly [number, number]
): MutableRefObject<(arg0: readonly [number, number]) => void> => {
  /* eslint-disable @typescript-eslint/no-empty-function */
  const labelStateSetterRef = useRef<(arg0: readonly [number, number]) => void>(
    () => {}
  )
  /* eslint-enable @typescript-eslint/no-empty-function */

  // This effect ensures that the labels state
  // is set when this parent component is rendered
  // the first time. Otherwise the labels will just
  // have the "initial" value in them.
  useEffect(() => {
    labelStateSetterRef.current(trackBounds)
  }, [])

  return labelStateSetterRef
}
