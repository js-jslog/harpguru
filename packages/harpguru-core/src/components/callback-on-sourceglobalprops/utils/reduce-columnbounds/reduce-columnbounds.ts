import { isMatchColumnBounds } from '../../../../utils'
import type { ColumnBounds } from '../../../../types'

export const reduceColumnBounds = (
  prevColumnBounds: ColumnBounds,
  sourceColumnBounds: ColumnBounds
): ColumnBounds => {
  if (isMatchColumnBounds(prevColumnBounds, sourceColumnBounds))
    return prevColumnBounds
  return sourceColumnBounds
}
