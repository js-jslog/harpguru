import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Interaction } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const setFromHarpStrataToInteractionMatrix = (
  newHarpStrata: HarpStrata,
  prevInteractionMatrix: HarpFaceMatrix<Interaction>,
  setInteractionMatrix: (arg0: HarpFaceMatrix<Interaction>) => void
): HarpFaceMatrix<Interaction> => {
  const {
    apparatus: { interactionMatrix: newInteractionMatrix },
  } = newHarpStrata
  if (
    !doSparceIdedObjectMatricesMatch(
      prevInteractionMatrix,
      newInteractionMatrix
    )
  )
    setInteractionMatrix(newInteractionMatrix)
  return newInteractionMatrix
}
