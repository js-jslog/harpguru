import { useGlobal } from 'reactn'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'
import { getCovariantSet, CovariantMembers } from 'harpcovariance'

import { DisplayModes } from '../../../../types'

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
      activeDisplayMode === DisplayModes.Degree ? 'DEGREE' : 'PITCH'
    )

    setActiveHarpStrata(getHarpStrata(nextHarpStrataProps))
  }

  return setHarpStrataByHarpKey
}
