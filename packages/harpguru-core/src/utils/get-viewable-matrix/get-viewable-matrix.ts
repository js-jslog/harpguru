import type { HarpFaceMatrix } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import { sliceMatrix } from '../../packages/slice-matrix'

export const getViewableMatrix = <T>(
  fullMatrix: HarpFaceMatrix<T>,
  columnBounds: 'FIT' | readonly [number, number]
): HarpFaceMatrix<T> => {
  if (columnBounds === 'FIT') return fullMatrix

  const [start, end] = columnBounds

  const viewableMatrix = sliceMatrix(fullMatrix, start, end + 1).filter(
    isPopulatedArray
  )

  return viewableMatrix
}
