import type { HarpFaceMatrix, Interaction } from 'harpparts'

import { deriveLayoutFacts } from '../../utils'
import { compareLayoutFacts } from '../../../../utils/compare-layout-facts'

type LayoutFacts = {
  readonly harpfaceColumns: number
  readonly harpfaceRows: number
}

// TODO: should be based on the less volatile interaction matrix
export const useDeriveLayoutFacts = (
  nextViewableInteractionMatrix: HarpFaceMatrix<Interaction>,
  prevLayoutFacts: LayoutFacts,
  setLayoutFacts: (arg0: LayoutFacts) => void
): LayoutFacts => {
  const nextLayoutFacts = deriveLayoutFacts(nextViewableInteractionMatrix)
  if (!compareLayoutFacts(prevLayoutFacts, nextLayoutFacts))
    setLayoutFacts(nextLayoutFacts)
  return nextLayoutFacts
}
