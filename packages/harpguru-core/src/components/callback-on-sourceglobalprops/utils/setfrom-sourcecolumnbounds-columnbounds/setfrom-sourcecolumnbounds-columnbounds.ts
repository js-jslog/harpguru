import { isMatchColumnBounds } from '../../../../utils'
import type { ColumnBounds } from '../../../../types'

export const setFromSourceColumnBoundsColumnBounds = (
  nextSourceColumnBounds: ColumnBounds,
  prevColumnBounds: ColumnBounds,
  setColumnBounds: (arg0: ColumnBounds) => void
): ColumnBounds => {
  if (isMatchColumnBounds(nextSourceColumnBounds, prevColumnBounds))
    return prevColumnBounds
  setColumnBounds(nextSourceColumnBounds)
  return nextSourceColumnBounds
}
