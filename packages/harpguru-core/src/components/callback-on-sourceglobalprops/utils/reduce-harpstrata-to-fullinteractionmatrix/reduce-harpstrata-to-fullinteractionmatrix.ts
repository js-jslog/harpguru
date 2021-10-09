import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Interaction } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const reduceHarpStrataToFullInteractionMatrix = (
  prevInteractionMatrix: HarpFaceMatrix<Interaction>,
  harpStrata: HarpStrata
): HarpFaceMatrix<Interaction> => {
  const {
    apparatus: { interactionMatrix: nextInteractionMatrix },
  } = harpStrata
  if (
    doSparceIdedObjectMatricesMatch(
      prevInteractionMatrix,
      nextInteractionMatrix
    )
  )
    return prevInteractionMatrix
  return nextInteractionMatrix
}
