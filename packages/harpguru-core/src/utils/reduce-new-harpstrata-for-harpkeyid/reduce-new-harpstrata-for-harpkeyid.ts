import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { comparePitchIds } from '../compare-pitchids'
import type { GlobalState } from '../../types'

export const reduceNewHarpStrataForHarpKeyId = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'harpKeyId'> => {
  const { harpKeyId: prev } = global
  const { harpKeyId: next } = newHarpStrata

  if (comparePitchIds(prev, next))
    return {
      harpKeyId: prev,
    }
  return {
    harpKeyId: next,
  }
}
