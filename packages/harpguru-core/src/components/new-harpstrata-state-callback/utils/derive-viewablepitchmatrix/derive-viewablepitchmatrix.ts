import type { HarpFaceMatrix, Pitch } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import { sliceMatrix } from '../../../../packages/slice-matrix'

export const deriveViewablePitchMatrix = (
  // TODO: Should consider simplifying this so that
  // only the next pitch matrix is passed in rather
  // than the entire harpstrata
  activePitchMatrix: HarpFaceMatrix<Pitch>,
  columnBounds: 'FIT' | readonly [number, number]
): HarpFaceMatrix<Pitch> => {
  if (columnBounds === 'FIT') return activePitchMatrix

  const [start, end] = columnBounds

  const nextViewablePitchMatrix = sliceMatrix(
    activePitchMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

  return nextViewablePitchMatrix
}
