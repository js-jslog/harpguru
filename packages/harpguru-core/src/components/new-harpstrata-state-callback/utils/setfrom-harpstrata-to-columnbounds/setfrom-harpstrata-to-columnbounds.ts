import type { HarpStrata } from 'harpstrata'

import { reduceHarpStrataToColumnBounds } from '../reduce-harpstrata-to-columnbounds'
import { isMatchedColumnBounds } from '../../../../utils'
import type { ColumnBounds } from '../../../../types'

export const setFromHarpStrataToColumnBounds = (
  newHarpStrata: HarpStrata,
  prevColumnBounds: ColumnBounds,
  setColumnBounds: (arg0: ColumnBounds) => void
): ColumnBounds => {
  const nextColumnBounds = reduceHarpStrataToColumnBounds(
    newHarpStrata,
    prevColumnBounds
  )
  if (!isMatchedColumnBounds(prevColumnBounds, nextColumnBounds))
    setColumnBounds(nextColumnBounds)
  return nextColumnBounds
}
