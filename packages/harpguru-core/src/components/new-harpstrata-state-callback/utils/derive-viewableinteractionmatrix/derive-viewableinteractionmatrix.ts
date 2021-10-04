import type { HarpFaceMatrix, Interaction } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import { sliceMatrix } from '../../../../packages/slice-matrix'

export const deriveViewableInteractionMatrix = (
  activeInteractionMatrix: HarpFaceMatrix<Interaction>,
  columnBounds: 'FIT' | readonly [number, number]
): HarpFaceMatrix<Interaction> => {
  if (columnBounds === 'FIT') return activeInteractionMatrix

  const [start, end] = columnBounds

  const nextViewableInteractionMatrix = sliceMatrix(
    activeInteractionMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

  return nextViewableInteractionMatrix
}
