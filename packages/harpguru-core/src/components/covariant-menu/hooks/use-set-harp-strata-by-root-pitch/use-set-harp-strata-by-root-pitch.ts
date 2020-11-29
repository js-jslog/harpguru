import { useGlobal } from 'reactn'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'
import { getCovariantSet, CovariantMembers } from 'harpcovariance'

import { DisplayModes } from '../../../../types'

const getNextCovariantSet = (
  activeHarpStrata: HarpStrata,
  lockedCovariant: CovariantMembers,
  newRootPitch: PitchIds
) => {
  const { harpKeyId, pozitionId } = activeHarpStrata

  if (lockedCovariant === CovariantMembers.HarpKey) {
    return getCovariantSet({
      rootPitchId: newRootPitch,
      harpKeyId,
    })
  } else {
    return getCovariantSet({
      rootPitchId: newRootPitch,
      pozitionId,
    })
  }
}

export const useSetHarpStrataByRootPitch = (): ((arg0: PitchIds) => void) => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [lockedCovariant] = useGlobal('lockedCovariant')

  const setHarpStrataByRootPitch = (rootPitchId: PitchIds): void => {
    if (lockedCovariant === CovariantMembers.RootPitch) return

    const nextCovariantSet = getNextCovariantSet(
      activeHarpStrata,
      lockedCovariant,
      rootPitchId
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

  return setHarpStrataByRootPitch
}
