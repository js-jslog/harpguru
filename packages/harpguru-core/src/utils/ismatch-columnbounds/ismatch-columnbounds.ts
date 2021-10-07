import type { ColumnBounds } from '../../types'

export const isMatchColumnBounds = (
  bounds1: ColumnBounds,
  bounds2: ColumnBounds
): boolean => {
  if (bounds1 === 'FIT') return bounds2 === 'FIT'
  const [start1, end1] = bounds1
  const [start2, end2] = bounds2
  if (start1 === start2 && end1 === end2) return true
  return false
}
