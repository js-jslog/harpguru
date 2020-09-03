import { useGlobal } from 'reactn'
import {
  getCovariantSet,
  getHarpStrata,
  getPitchIds,
  PitchIds,
} from 'harpstrata'
import type { HarpStrata } from 'harpstrata'

import {
  partiallyApplyNudgeFunction,
  getPropsForHarpStrata,
} from '../../../../utils'
import type { SetActiveHarpStrata } from '../../../../types'
import { DisplayModes } from '../../../../types'
import { CovariantMembers } from '../../../../packages/covariance-series'

export const useNudgeHarpStrataByHarpKey = (): ((
  arg0: 'UP' | 'DOWN'
) => void) => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [lockedCovariant] = useGlobal('lockedCovariant')

  return partiallyApplyNudgeFunction(nudgeHarpStrataByHarpKey, {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
    lockedCovariant,
  })
}

const getNextId = (rootId: PitchIds, direction: 'UP' | 'DOWN'): PitchIds => {
  if (direction === 'UP') {
    const [, nextPitchId] = getPitchIds(rootId)
    return nextPitchId
  }
  const [previousHarpKeyId] = getPitchIds(rootId).slice(-1)
  return previousHarpKeyId
}

const getNextCovariantSet = (
  activeHarpStrata: HarpStrata,
  lockedCovariant: CovariantMembers,
  direction: 'UP' | 'DOWN'
) => {
  const { rootPitchId, harpKeyId, pozitionId } = activeHarpStrata

  if (lockedCovariant === CovariantMembers.Pozition) {
    return getCovariantSet({
      harpKeyId: getNextId(harpKeyId, direction),
      pozitionId,
    })
  } else {
    return getCovariantSet({
      harpKeyId: getNextId(harpKeyId, direction),
      rootPitchId,
    })
  }
}

type PartialParams = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
  readonly activeDisplayMode: DisplayModes
  readonly lockedCovariant: CovariantMembers
}

const nudgeHarpStrataByHarpKey = (
  partialParams: PartialParams,
  direction: 'UP' | 'DOWN'
): void => {
  const {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
    lockedCovariant,
  } = partialParams

  if (lockedCovariant === CovariantMembers.HarpKey) return

  const nextCovariantSet = getNextCovariantSet(
    activeHarpStrata,
    lockedCovariant,
    direction
  )

  const nextHarpStrataProps = getPropsForHarpStrata(
    {
      ...activeHarpStrata,
      harpKeyId: nextCovariantSet.harpKeyId,
      pozitionId: nextCovariantSet.pozitionId,
    },
    activeDisplayMode
  )

  setActiveHarpStrata(getHarpStrata(nextHarpStrataProps))
}
