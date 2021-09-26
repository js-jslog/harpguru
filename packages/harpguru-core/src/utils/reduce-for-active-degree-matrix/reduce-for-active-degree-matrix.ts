import type { Dispatch } from 'reactn/default'
import type { HarpFaceMatrix, Degree } from 'harpparts'

import type { GlobalState } from '../../types'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'

export const reduceForActiveDegreeMatrix = (
  global: GlobalState,
  _dipatch: Dispatch,
  newDegreeMatrix: HarpFaceMatrix<Degree>
): Pick<GlobalState, 'activeDegreeMatrix'> => {
  const { activeDegreeMatrix } = global
  if (doSparceIdedObjectMatricesMatch(activeDegreeMatrix, newDegreeMatrix)) {
    return {
      activeDegreeMatrix,
    }
  }
  return {
    activeDegreeMatrix: newDegreeMatrix,
  }
}
