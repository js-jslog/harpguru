import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import type { GlobalState } from '../../types'

import { comparePozitionIds } from './utils'

export const reduceNewHarpStrataForPozitionId = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'pozitionId'> => {
  const { pozitionId: prev } = global
  const { pozitionId: next } = newHarpStrata

  if (comparePozitionIds(prev, next))
    return {
      pozitionId: prev,
    }
  return {
    pozitionId: next,
  }
}
