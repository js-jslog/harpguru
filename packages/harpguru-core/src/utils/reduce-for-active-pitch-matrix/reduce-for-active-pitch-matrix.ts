import type { Dispatch } from 'reactn/default'
import type { HarpFaceMatrix, Pitch } from 'harpparts'

import type { GlobalState } from '../../types'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'

export const reduceForActivePitchMatrix = (
  global: GlobalState,
  _dipatch: Dispatch,
  newPitchMatrix: HarpFaceMatrix<Pitch>
): Pick<GlobalState, 'activePitchMatrix'> => {
  const { activePitchMatrix } = global
  if (doSparceIdedObjectMatricesMatch(activePitchMatrix, newPitchMatrix)) {
    return {
      activePitchMatrix,
    }
  }
  return {
    activePitchMatrix: newPitchMatrix,
  }
}
