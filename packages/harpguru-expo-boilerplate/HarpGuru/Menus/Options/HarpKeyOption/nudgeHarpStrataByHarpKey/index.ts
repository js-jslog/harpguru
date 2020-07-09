import { getCovariantSet, getHarpStrata, getPitchIds, PitchIds } from 'harpstrata'

import type { HarpKeyOptionProps } from '../types'
import { getPropsForHarpStrata } from '../../../../Controls'

const getNextId = (rootId: PitchIds, direction: 'UP' | 'DOWN'): PitchIds => {
  if (direction === 'UP') {
    const [ , nextPitchId ] = getPitchIds(rootId)
    return nextPitchId
  }
  const [ previousHarpKeyId ] = getPitchIds(rootId).slice(-1)
  return previousHarpKeyId
}

export const nudgeHarpStrataByHarpKey = (partialParams: HarpKeyOptionProps, direction: 'UP' | 'DOWN'): void => {
  const { activeHarpStrata, setActiveHarpStrata, activeDisplayMode } = partialParams
  const { rootPitchId, harpKeyId } = activeHarpStrata

  const covariantGroup = getCovariantSet({ rootPitchId, harpKeyId: getNextId(harpKeyId, direction) })

  const nextHarpStrataProps = getPropsForHarpStrata({
    ...activeHarpStrata,
    pozitionId: covariantGroup.pozitionId,
    harpKeyId: covariantGroup.harpKeyId,
  }, activeDisplayMode)

  setActiveHarpStrata(getHarpStrata(nextHarpStrataProps))
}
