import {
  getCovariantSet,
  getHarpStrata,
  getPitchIds,
  PitchIds,
} from 'harpstrata'
import type { HarpStrata } from 'harpstrata'

import { DisplayModes } from '../../../../types'
import type { SetActiveHarpStrata } from '../../../../helpers'
import { getPropsForHarpStrata } from '../../../../helpers'

const getNextId = (rootId: PitchIds, direction: 'UP' | 'DOWN'): PitchIds => {
  if (direction === 'UP') {
    const [, nextPitchId] = getPitchIds(rootId)
    return nextPitchId
  }
  const [previousRootPitchId] = getPitchIds(rootId).slice(-1)
  return previousRootPitchId
}

type Props = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
  readonly activeDisplayMode: DisplayModes
}

export const nudgeHarpStrataByRootPitch = (
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
}
