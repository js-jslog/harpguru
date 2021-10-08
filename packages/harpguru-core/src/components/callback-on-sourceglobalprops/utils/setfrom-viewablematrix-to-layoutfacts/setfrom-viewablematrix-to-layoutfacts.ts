import type { HarpFaceMatrix } from 'harpparts'

import { isMatchLayoutFacts } from '../ismatch-layoutfacts'
import { reduceViewableMatrixToLayoutFacts } from '../../../../utils'
import type { LayoutFacts } from '../../../../types'

export const setFromViewableMatrixToLayoutFacts = <T>(
  nextViewableMatrix: HarpFaceMatrix<T>,
  prevLayoutFacts: LayoutFacts,
  setLayoutFacts: (arg0: LayoutFacts) => void
): LayoutFacts => {
  const nextLayoutFacts = reduceViewableMatrixToLayoutFacts(
    prevLayoutFacts,
    nextViewableMatrix
  )
  if (!isMatchLayoutFacts(prevLayoutFacts, nextLayoutFacts))
    setLayoutFacts(nextLayoutFacts)
  return nextLayoutFacts
}
