import type { Dispatch } from 'reactn/default'
import type { HarpFaceMatrix, Degree } from 'harpparts'

import type { GlobalState } from '../../types'

export const reduceForActiveDegreeMatrix = (
  _global: GlobalState,
  _dipatch: Dispatch,
  activeDegreeMatrix: HarpFaceMatrix<Degree>
): Pick<GlobalState, 'activeDegreeMatrix'> => {
  // TODO: There needs to be a full matrix comparison
  // and return the original global variables identity
  // if they match
  return {
    activeDegreeMatrix,
  }
}
