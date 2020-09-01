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

  const { rootPitchId, harpKeyId, pozitionId } = activeHarpStrata

  if (lockedCovariant === CovariantMembers.RootPitch) {
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
  } else {
    const nextHarpStrataProps = getPropsForHarpStrata(
      {
        ...activeHarpStrata,
        pozitionId,
        harpKeyId: getNextId(harpKeyId, direction),
      },
      activeDisplayMode
    )

    setActiveHarpStrata(getHarpStrata(nextHarpStrataProps))
  }
}
