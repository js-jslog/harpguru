import type { HarpFaceMatrix, Interaction } from 'harpparts'

import { deriveViewableInteractionMatrix } from '../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const useDeriveViewableInteractionMatrix = (
  nextInteractionMatrix: HarpFaceMatrix<Interaction>,
  nextColumnBounds: 'FIT' | readonly [number, number],
  prevViewableInteractionMatrix: HarpFaceMatrix<Interaction>,
  setViewableInteractionMatrix: (arg0: HarpFaceMatrix<Interaction>) => void
): HarpFaceMatrix<Interaction> => {
  const nextViewableInteractionMatrix = deriveViewableInteractionMatrix(
    nextInteractionMatrix,
    nextColumnBounds
  )
  if (
    !doSparceIdedObjectMatricesMatch(
      prevViewableInteractionMatrix,
      nextViewableInteractionMatrix
    )
  )
    setViewableInteractionMatrix(nextViewableInteractionMatrix)
  return nextViewableInteractionMatrix
}
