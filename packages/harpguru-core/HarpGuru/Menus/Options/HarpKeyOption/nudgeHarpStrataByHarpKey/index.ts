import {
  getCovariantSet,
  getHarpStrata,
  getPitchIds,
  PitchIds,
} from 'harpstrata'
import type { HarpStrata } from 'harpstrata'

import type { HarpKeyOptionProps } from '../types'
import type { SetActiveHarpStrata } from '../../../../helpers'
import { getPropsForHarpStrata } from '../../../../helpers'

const getNextId = (rootId: PitchIds, direction: 'UP' | 'DOWN'): PitchIds => {
  if (direction === 'UP') {
    const [, nextPitchId] = getPitchIds(rootId)
    return nextPitchId
  }
  const [previousHarpKeyId] = getPitchIds(rootId).slice(-1)
  return previousHarpKeyId
}

type Props = HarpKeyOptionProps & {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
}

export const nudgeHarpStrataByHarpKey = (
  partialParams: Props,
  direction: 'UP' | 'DOWN'
): void => {
  const {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
  } = partialParams
  const { rootPitchId, harpKeyId } = activeHarpStrata

  const covariantGroup = getCovariantSet({
    rootPitchId,
    harpKeyId: getNextId(harpKeyId, direction),
  })

  const nextHarpStrataProps = getPropsForHarpStrata(
    {
      ...activeHarpStrata,
      pozitionId: covariantGroup.pozitionId,
      harpKeyId: covariantGroup.harpKeyId,
    },
    activeDisplayMode
  )

  setActiveHarpStrata(getHarpStrata(nextHarpStrataProps))
}
