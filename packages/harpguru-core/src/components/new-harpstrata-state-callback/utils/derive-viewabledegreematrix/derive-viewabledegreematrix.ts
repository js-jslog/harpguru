import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Degree } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import { deriveColumnBounds } from '../derive-columnbounds'
import { sliceMatrix } from '../../../../packages/slice-matrix'

export const deriveViewableDegreeMatrix = (
  // TODO: Should consider simplifying this so that
  // only the next degree matrix is passed in rather
  // than the entire harpstrata
  activeHarpStrata: HarpStrata,
  prevColumnBounds: 'FIT' | readonly [number, number]
): HarpFaceMatrix<Degree> => {
  const newColumnBounds = deriveColumnBounds(activeHarpStrata, prevColumnBounds)
  if (newColumnBounds === 'FIT') return activeHarpStrata.degreeMatrix

  const [start, end] = newColumnBounds

  const newViewableDegreeMatrix = sliceMatrix(
    activeHarpStrata.degreeMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

  return newViewableDegreeMatrix
}
