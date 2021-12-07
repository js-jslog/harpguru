import type { LayoutFacts, ColumnBounds } from '../../types'

export const getIfZoomedColumnBounds = (
  layoutFacts: LayoutFacts,
  columnBounds: ColumnBounds
): false | readonly [number, number] => {
  if (columnBounds === 'FIT') return false
  const holeSpan = columnBounds[1] - columnBounds[0] + 1
  const { harpfaceColumns } = layoutFacts
  if (holeSpan >= harpfaceColumns) return false
  return columnBounds
}
