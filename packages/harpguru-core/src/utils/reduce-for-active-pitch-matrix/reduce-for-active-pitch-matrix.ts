import type { Dispatch } from 'reactn/default'
import type { HarpFaceMatrix, Pitch } from 'harpparts'

import type { GlobalState } from '../../types'

export const reduceForActivePitchMatrix = (
  _global: GlobalState,
  _dipatch: Dispatch,
  activePitchMatrix: HarpFaceMatrix<Pitch>
): Pick<GlobalState, 'activePitchMatrix'> => {
  // TODO: There needs to be a full matrix comparison
  // and return the original global variables identity
  // if they match
  return {
    activePitchMatrix,
  }
}
