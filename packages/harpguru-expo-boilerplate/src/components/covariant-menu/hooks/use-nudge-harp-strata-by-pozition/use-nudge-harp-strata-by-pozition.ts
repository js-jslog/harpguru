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

export const useNudgeHarpStrataByPozition = (): ((
  arg0: 'UP' | 'DOWN'
) => void) => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')

  return partiallyApplyNudgeFunction(nudgeHarpStrataByPozition, {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
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

type PartialParams = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
  readonly activeDisplayMode: DisplayModes
}

const nudgeHarpStrataByPozition = (
  partialParams: PartialParams,
  direction: 'UP' | 'DOWN'
): void => {
  const {
    activeHarpStrata,
    setActiveHarpStrata,
    activeDisplayMode,
  } = partialParams
  const { pozitionId, harpKeyId } = activeHarpStrata

  const covariantGroup = getCovariantSet({
    pozitionId: getNextId(pozitionId, direction),
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
}
