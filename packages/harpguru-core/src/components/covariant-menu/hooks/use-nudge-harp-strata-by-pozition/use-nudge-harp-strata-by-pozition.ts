import { useGlobal } from 'reactn'
import {
  getPozitionIds,
  getCovariantSet,
  getHarpStrata,
  PozitionIds,
} from 'harpstrata'
import type { HarpStrata } from 'harpstrata'

import {
  partiallyApplyNudgeFunction,
  getPropsForHarpStrata,
} from '../../../../utils'
import { DisplayModes } from '../../../../types'
import type { SetActiveHarpStrata } from '../../../../types'
import { CovariantMembers } from '../../../../packages/covariance-series'

export const useNudgeHarpStrataByPozition = (): ((
  arg0: 'UP' | 'DOWN'
) => void) => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [lockedCovariant] = useGlobal('lockedCovariant')

  return partiallyApplyNudgeFunction(nudgeHarpStrataByPozition, {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
    lockedCovariant,
  })
}

const getNextId = (
  rootId: PozitionIds,
  direction: 'UP' | 'DOWN'
): PozitionIds => {
  if (direction === 'UP') {
    const [, nextPozitionId] = getPozitionIds(rootId)
    return nextPozitionId
  }
  const [previousPozitionId] = getPozitionIds(rootId).slice(-1)
  return previousPozitionId
}

const getNextHarpStrataProps = (
  activeHarpStrata: HarpStrata,
  lockedCovariant: CovariantMembers,
  direction: 'UP' | 'DOWN',
  activeDisplayMode: DisplayModes
) => {
  const { pozitionId, harpKeyId, rootPitchId } = activeHarpStrata

  if (lockedCovariant === CovariantMembers.HarpKey) {
    return getPropsForHarpStrata(
      {
        ...activeHarpStrata,
        pozitionId: getNextId(pozitionId, direction),
        harpKeyId,
      },
      activeDisplayMode
    )
  } else {
    const covariantGroup = getCovariantSet({
      pozitionId: getNextId(pozitionId, direction),
      rootPitchId,
    })

    return getPropsForHarpStrata(
      {
        ...activeHarpStrata,
        pozitionId: covariantGroup.pozitionId,
        harpKeyId: covariantGroup.harpKeyId,
      },
      activeDisplayMode
    )
  }
}

type PartialParams = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
  readonly activeDisplayMode: DisplayModes
  readonly lockedCovariant: CovariantMembers
}

const nudgeHarpStrataByPozition = (
  partialParams: PartialParams,
  direction: 'UP' | 'DOWN'
): void => {
  const {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
    lockedCovariant,
  } = partialParams

  if (lockedCovariant === CovariantMembers.Pozition) return

  const nextHarpStrataProps = getNextHarpStrataProps(
    activeHarpStrata,
    lockedCovariant,
    direction,
    activeDisplayMode
  )
  setActiveHarpStrata(getHarpStrata(nextHarpStrataProps))
}
