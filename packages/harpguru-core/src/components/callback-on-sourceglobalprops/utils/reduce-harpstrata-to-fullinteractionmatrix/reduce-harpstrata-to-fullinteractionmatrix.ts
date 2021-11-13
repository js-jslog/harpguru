import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Interaction } from 'harpparts'

import { isMatchHighOrderTuples } from '../../../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const reduceHarpStrataToFullInteractionMatrix = (
  prevInteractionMatrix: readonly [
    HarpFaceMatrix<Interaction>,
    HarpFaceMatrix<Interaction>
  ],
  harpStrata: HarpStrata
): readonly [HarpFaceMatrix<Interaction>, HarpFaceMatrix<Interaction>] => {
  const {
    apparatus: { interactionMatrix: nextInteractionMatrix },
  } = harpStrata
  if (
    isMatchHighOrderTuples(
      doSparceIdedObjectMatricesMatch,
      prevInteractionMatrix,
      nextInteractionMatrix
    )
  )
    return prevInteractionMatrix
  return nextInteractionMatrix
}
