import type { HarpFaceMatrix } from 'harpparts'

import { reduceViewableMatrixToLayoutFacts } from '../reduce-viewablematrix-to-layoutfacts'
import { compareLayoutFacts } from '../../../../utils/compare-layout-facts'

type LayoutFacts = {
  readonly harpfaceColumns: number
  readonly harpfaceRows: number
}

export const setFromViewableMatrixToLayoutFacts = <T>(
  nextViewableMatrix: HarpFaceMatrix<T>,
  prevLayoutFacts: LayoutFacts,
  setLayoutFacts: (arg0: LayoutFacts) => void
): LayoutFacts => {
  const nextLayoutFacts = reduceViewableMatrixToLayoutFacts(nextViewableMatrix)
  if (!compareLayoutFacts(prevLayoutFacts, nextLayoutFacts))
    setLayoutFacts(nextLayoutFacts)
  return nextLayoutFacts
}
