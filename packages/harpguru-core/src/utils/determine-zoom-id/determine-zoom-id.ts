import { ZoomIds } from '../../types'

export const determineZoomId = (
  columnBounds: 'FIT' | readonly [number, number]
): ZoomIds => {
  if (columnBounds === 'FIT') {
    return ZoomIds.Fit
  }
  const [startColumn, endColumn] = columnBounds
  const columnCount = endColumn - startColumn + 1
  if (columnCount === ZoomIds.Seven) {
    return ZoomIds.Seven
  }
  if (columnCount === ZoomIds.Ten) {
    return ZoomIds.Ten
  }
  if (columnCount === ZoomIds.Twelve) {
    return ZoomIds.Twelve
  }
  throw Error(`
Current columnBounds (${columnBounds}) does not
map to an available ZoomId.
  `)
}
