import { isMatchedColumnBounds } from '../../../../utils'
import type { ColumnBounds } from '../../../../types'

export const setFromSourceColumnBounds = (
  newSourceColumnBounds: ColumnBounds,
  prevColumnBounds: ColumnBounds,
  setColumnBounds: (arg0: ColumnBounds) => void
): ColumnBounds => {
  if (isMatchedColumnBounds(newSourceColumnBounds, prevColumnBounds))
    return prevColumnBounds
  setColumnBounds(newSourceColumnBounds)
  return newSourceColumnBounds
}
