import { useGlobal } from 'reactn'
import { getHarpStrata } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'
import { getPitchIds } from 'harpparts'
import type { PitchIds } from 'harpparts'
import { getCovariantSet, CovariantMembers } from 'harpcovariance'

import {
  partiallyApplyNudgeFunction,
  getPropsForHarpStrata,
} from '../../../../utils'
import { DisplayModes } from '../../../../types'
import type { SetActiveHarpStrata } from '../../../../types'

export const useNudgeHarpStrataByRootPitch = (): ((
  arg0: 'UP' | 'DOWN'
) => void) => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [lockedCovariant] = useGlobal('lockedCovariant')

  return partiallyApplyNudgeFunction(nudgeHarpStrataByRootPitch, {
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
  const [previousRootPitchId] = getPitchIds(rootId).slice(-1)
  return previousRootPitchId
}

const getNextCovariantSet = (
  activeHarpStrata: HarpStrata,
  lockedCovariant: CovariantMembers,
  direction: 'UP' | 'DOWN'
) => {
  const { rootPitchId, harpKeyId, pozitionId } = activeHarpStrata

  if (lockedCovariant === CovariantMembers.HarpKey) {
    return getCovariantSet({
      rootPitchId: getNextId(rootPitchId, direction),
      harpKeyId,
    })
  } else {
    return getCovariantSet({
      rootPitchId: getNextId(rootPitchId, direction),
      pozitionId,
    })
  }
}

type PartialParams = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
  readonly activeDisplayMode: DisplayModes
  readonly lockedCovariant: CovariantMembers
}

const nudgeHarpStrataByRootPitch = (
  partialParams: PartialParams,
  direction: 'UP' | 'DOWN'
): void => {
  const {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
    lockedCovariant,
  } = partialParams

  if (lockedCovariant === CovariantMembers.RootPitch) return

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
