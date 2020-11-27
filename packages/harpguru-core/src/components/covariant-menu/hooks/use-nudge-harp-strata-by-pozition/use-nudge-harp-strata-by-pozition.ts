import { useGlobal } from 'reactn'
import { getHarpStrata } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'
import { PozitionIds, getPozitionIds } from 'harpparts'
import { getCovariantSet } from 'harpcovariance'

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

const getNextCovariantSet = (
  activeHarpStrata: HarpStrata,
  lockedCovariant: CovariantMembers,
  direction: 'UP' | 'DOWN'
) => {
  const { pozitionId, harpKeyId, rootPitchId } = activeHarpStrata

  if (lockedCovariant === CovariantMembers.HarpKey) {
    return getCovariantSet({
      pozitionId: getNextId(pozitionId, direction),
      harpKeyId,
    })
  } else {
    return getCovariantSet({
      pozitionId: getNextId(pozitionId, direction),
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
