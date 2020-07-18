import {
  getPozitionIds,
  getCovariantSet,
  getHarpStrata,
  PozitionIds,
} from 'harpstrata'
import type { HarpStrata } from 'harpstrata'

import type { PozitionOptionProps } from '../types'
import type { SetActiveHarpStrata } from '../../../../helpers'
import { getPropsForHarpStrata } from '../../../../helpers'

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

type Props = PozitionOptionProps & {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
}

export const nudgeHarpStrataByPozition = (
  partialParams: Props,
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
