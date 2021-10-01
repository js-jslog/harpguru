import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Pitch } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import { deriveColumnBounds } from '../derive-columnbounds'
import { sliceMatrix } from '../../../../packages/slice-matrix'

export const deriveViewablePitchMatrix = (
  // TODO: Should consider simplifying this so that
  // only the next pitch matrix is passed in rather
  // than the entire harpstrata
  activeHarpStrata: HarpStrata,
  prevColumnBounds: 'FIT' | readonly [number, number]
): HarpFaceMatrix<Pitch> => {
  const newColumnBounds = deriveColumnBounds(activeHarpStrata, prevColumnBounds)
  if (newColumnBounds === 'FIT') return activeHarpStrata.pitchMatrix

  const [start, end] = newColumnBounds

  const newViewablePitchMatrix = sliceMatrix(
    activeHarpStrata.pitchMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

  return newViewablePitchMatrix
}
