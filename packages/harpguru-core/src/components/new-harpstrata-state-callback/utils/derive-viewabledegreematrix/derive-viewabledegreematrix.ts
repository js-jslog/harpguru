import type { HarpFaceMatrix, Degree } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import { sliceMatrix } from '../../../../packages/slice-matrix'

export const deriveViewableDegreeMatrix = (
  // TODO: Should consider simplifying this so that
  // only the next degree matrix is passed in rather
  // than the entire harpstrata
  activeDegreeMatrix: HarpFaceMatrix<Degree>,
  columnBounds: 'FIT' | readonly [number, number]
): HarpFaceMatrix<Degree> => {
  if (columnBounds === 'FIT') return activeDegreeMatrix

  const [start, end] = columnBounds

  const nextViewableDegreeMatrix = sliceMatrix(
    activeDegreeMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

  return nextViewableDegreeMatrix
}
