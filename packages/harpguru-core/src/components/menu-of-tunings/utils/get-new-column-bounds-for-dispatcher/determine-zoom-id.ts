import { ZoomIds } from '../../types'

export const determineZoomId = (
  columnBounds: readonly [number, number] | 'FIT'
): ZoomIds => {
  if (columnBounds === 'FIT') {
    return ZoomIds.Fit
  }
  const [startColumn, endColumn] = columnBounds
  if (endColumn - startColumn + 1 === 7) {
    return ZoomIds.Seven
  }
  throw Error('TODO DETERMINE ERROR MESSAGE')
}
