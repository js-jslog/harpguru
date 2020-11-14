import { useGlobal } from 'reactn'
import { getCovariantSet, getHarpStrata } from 'harpstrata'
import type { HarpStrata, PitchIds } from 'harpstrata'

import { getPropsForHarpStrata } from '../../../../utils'
import { CovariantMembers } from '../../../../packages/covariance-series'

const getNextCovariantSet = (
  activeHarpStrata: HarpStrata,
  lockedCovariant: CovariantMembers,
  newHarpKeyId: PitchIds
) => {
  const { rootPitchId, pozitionId } = activeHarpStrata

  if (lockedCovariant === CovariantMembers.Pozition) {
    return getCovariantSet({
      harpKeyId: newHarpKeyId,
      pozitionId,
    })
  } else {
    return getCovariantSet({
      harpKeyId: newHarpKeyId,
      rootPitchId,
    })
  }
}

export const useSetHarpStrataByHarpKey = (): ((arg0: PitchIds) => void) => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [lockedCovariant] = useGlobal('lockedCovariant')

  const setHarpStrataByHarpKey = (harpKeyId: PitchIds): void => {
    if (lockedCovariant === CovariantMembers.HarpKey) return

    const nextCovariantSet = getNextCovariantSet(
      activeHarpStrata,
      lockedCovariant,
      harpKeyId
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

  return setHarpStrataByHarpKey
}
