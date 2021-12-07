import type { LayoutFacts, ColumnBounds } from '../../types'

export const getIfZoomedColumnBounds = (
  layoutFacts: LayoutFacts,
  columnBounds: ColumnBounds
): false | readonly [number, number] => {
  if (columnBounds === 'FIT') return false
  const { harpfaceColumns } = layoutFacts
  if (columnBounds[0] !== 0) return columnBounds
  if (columnBounds[1] + 1 < harpfaceColumns) return columnBounds
  return false
}
