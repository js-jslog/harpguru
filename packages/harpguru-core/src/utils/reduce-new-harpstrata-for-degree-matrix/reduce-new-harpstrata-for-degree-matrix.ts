import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import type { GlobalState } from '../../types'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'

// TODO: Copied from reduce-for-active-degree-matrix
// Make sure to add unit tests for the return value
// equality checks, and create a util for pulling
// the degreeMatrix off the harpstrata and mock it
// out during unit testing.
export const reduceNewHarpStrataForDegreeMatrix = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'activeDegreeMatrix'> => {
  const { activeDegreeMatrix } = global
  const { degreeMatrix: newDegreeMatrix } = newHarpStrata
  if (doSparceIdedObjectMatricesMatch(activeDegreeMatrix, newDegreeMatrix)) {
    return {
      activeDegreeMatrix,
    }
  }
  return {
    activeDegreeMatrix: newDegreeMatrix,
  }
}
