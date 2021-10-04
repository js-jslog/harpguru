import type { HarpFaceMatrix } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import { sliceMatrix } from '../../../../packages/slice-matrix'

export const reduceHarpStrataToViewableMatrix = <T>(
  activeMatrix: HarpFaceMatrix<T>,
  columnBounds: 'FIT' | readonly [number, number]
): HarpFaceMatrix<T> => {
  if (columnBounds === 'FIT') return activeMatrix

  const [start, end] = columnBounds

  const nextViewableMatrix = sliceMatrix(activeMatrix, start, end + 1).filter(
    isPopulatedArray
  )

  return nextViewableMatrix
}
