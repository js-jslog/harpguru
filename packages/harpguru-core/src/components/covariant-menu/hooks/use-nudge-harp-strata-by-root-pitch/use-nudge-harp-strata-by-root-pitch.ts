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
import { DisplayModes } from '../../../../types'
import type { SetActiveHarpStrata } from '../../../../types'
import { CovariantMembers } from '../../../../packages/covariance-series'

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

  const { rootPitchId, harpKeyId, pozitionId } = activeHarpStrata

  if (lockedCovariant === CovariantMembers.HarpKey) {
    const covariantGroup = getCovariantSet({
      rootPitchId: getNextId(rootPitchId, direction),
      harpKeyId,
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
  } else {
    const covariantGroup = getCovariantSet({
      rootPitchId: getNextId(rootPitchId, direction),
      pozitionId,
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
}
