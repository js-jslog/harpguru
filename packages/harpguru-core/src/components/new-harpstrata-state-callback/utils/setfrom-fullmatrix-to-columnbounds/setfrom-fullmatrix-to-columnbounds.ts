import type { HarpFaceMatrix } from 'harpparts'

import { reduceFullMatrixToColumnBounds } from '../reduce-fullmatrix-to-columnbounds'
import { isMatchColumnBounds } from '../../../../utils'
import type { ColumnBounds } from '../../../../types'

export const setFromFullMatrixToColumnBounds = (
  nextFullMatrix: HarpFaceMatrix<unknown>,
  prevColumnBounds: ColumnBounds,
  setColumnBounds: (arg0: ColumnBounds) => void
): ColumnBounds => {
  const nextColumnBounds = reduceFullMatrixToColumnBounds(
    nextFullMatrix,
    prevColumnBounds
  )
  if (!isMatchColumnBounds(prevColumnBounds, nextColumnBounds))
    setColumnBounds(nextColumnBounds)
  return nextColumnBounds
}
