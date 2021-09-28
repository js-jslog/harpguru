import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import type { GlobalState } from '../../types'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'

// TODO: Copied from reduce-for-active-pitch-matrix
// Make sure to add unit tests for the return value
// equality checks, and create a util for pulling
// the pitchMatrix off the harpstrata and mock it
// out during unit testing.
export const reduceNewHarpStrataForPitchMatrix = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'activePitchMatrix'> => {
  const { activePitchMatrix } = global
  const { pitchMatrix: newPitchMatrix } = newHarpStrata
  if (doSparceIdedObjectMatricesMatch(activePitchMatrix, newPitchMatrix))
    return {
      activePitchMatrix,
    }
  return {
    activePitchMatrix: newPitchMatrix,
  }
}
