import type { HarpStrata } from 'harpstrata'

import { deriveColumnBounds } from '../../utils'
import { isMatchedColumnBounds } from '../../../../utils'

export const useDeriveColumnBounds = (
  newHarpStrata: HarpStrata,
  prevColumnBounds: 'FIT' | readonly [number, number],
  setColumnBounds: (arg0: 'FIT' | readonly [number, number]) => void
): 'FIT' | readonly [number, number] => {
  const nextColumnBounds = deriveColumnBounds(newHarpStrata, prevColumnBounds)
  if (!isMatchedColumnBounds(prevColumnBounds, nextColumnBounds))
    setColumnBounds(nextColumnBounds)
  return nextColumnBounds
}
