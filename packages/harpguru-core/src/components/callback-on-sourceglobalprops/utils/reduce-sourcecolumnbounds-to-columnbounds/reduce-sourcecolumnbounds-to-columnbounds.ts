import { isMatchColumnBounds } from '../../../../utils'
import type { ColumnBounds } from '../../../../types'

export const reduceSourceColumnBoundsToColumnBounds = (
  prevColumnBounds: ColumnBounds,
  sourceColumnBounds: ColumnBounds
): ColumnBounds => {
  if (isMatchColumnBounds(prevColumnBounds, sourceColumnBounds))
    return prevColumnBounds
  return sourceColumnBounds
}
