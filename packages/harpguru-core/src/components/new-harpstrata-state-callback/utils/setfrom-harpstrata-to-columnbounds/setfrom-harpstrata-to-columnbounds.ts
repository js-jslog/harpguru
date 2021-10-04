import type { HarpStrata } from 'harpstrata'

import { reduceHarpStrataToColumnBounds } from '../reduce-harpstrata-to-columnbounds'
import { isMatchedColumnBounds } from '../../../../utils'

export const setFromHarpStrataToColumnBounds = (
  newHarpStrata: HarpStrata,
  prevColumnBounds: 'FIT' | readonly [number, number],
  setColumnBounds: (arg0: 'FIT' | readonly [number, number]) => void
): 'FIT' | readonly [number, number] => {
  const nextColumnBounds = reduceHarpStrataToColumnBounds(
    newHarpStrata,
    prevColumnBounds
  )
  if (!isMatchedColumnBounds(prevColumnBounds, nextColumnBounds))
    setColumnBounds(nextColumnBounds)
  return nextColumnBounds
}
