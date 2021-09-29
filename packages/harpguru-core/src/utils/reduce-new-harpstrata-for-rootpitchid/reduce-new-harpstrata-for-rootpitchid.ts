import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { comparePitchIds } from '../compare-pitchids'
import type { GlobalState } from '../../types'

export const reduceNewHarpStrataForRootPitchId = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'rootPitchId'> => {
  const { rootPitchId: prev } = global
  const { rootPitchId: next } = newHarpStrata

  if (comparePitchIds(prev, next))
    return {
      rootPitchId: prev,
    }
  return {
    rootPitchId: next,
  }
}
