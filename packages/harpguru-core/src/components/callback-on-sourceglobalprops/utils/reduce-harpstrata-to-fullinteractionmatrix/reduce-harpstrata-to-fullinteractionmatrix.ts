import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrices, Interaction } from 'harpparts'

import { isMatchHarpFaceMatrices } from '../../../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const reduceHarpStrataToFullInteractionMatrix = (
  prevInteractionMatrix: HarpFaceMatrices<Interaction>,
  harpStrata: HarpStrata
): HarpFaceMatrices<Interaction> => {
  const {
    apparatus: { interactionMatrix: nextInteractionMatrix },
  } = harpStrata
  if (
    isMatchHarpFaceMatrices(
      doSparceIdedObjectMatricesMatch,
      prevInteractionMatrix,
      nextInteractionMatrix
    )
  )
    return prevInteractionMatrix
  return nextInteractionMatrix
}
