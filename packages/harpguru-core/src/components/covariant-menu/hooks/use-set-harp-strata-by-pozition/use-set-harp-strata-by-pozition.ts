import { useGlobal } from 'reactn'
import { getCovariantSet, getHarpStrata } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'
import { PozitionIds } from 'harpparts'

import { getPropsForHarpStrata } from '../../../../utils'
import { CovariantMembers } from '../../../../packages/covariance-series'

const getNextCovariantSet = (
  activeHarpStrata: HarpStrata,
  lockedCovariant: CovariantMembers,
  newPozitionId: PozitionIds
) => {
  const { harpKeyId, rootPitchId } = activeHarpStrata

  if (lockedCovariant === CovariantMembers.HarpKey) {
    return getCovariantSet({
      pozitionId: newPozitionId,
      harpKeyId,
    })
  } else {
    return getCovariantSet({
      pozitionId: newPozitionId,
      rootPitchId,
    })
  }
}

export const useSetHarpStrataByPozition = (): ((arg0: PozitionIds) => void) => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [lockedCovariant] = useGlobal('lockedCovariant')

  const setHarpStrataByPozition = (pozitionId: PozitionIds): void => {
    if (lockedCovariant === CovariantMembers.Pozition) return

    const nextCovariantSet = getNextCovariantSet(
      activeHarpStrata,
      lockedCovariant,
      pozitionId
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

  return setHarpStrataByPozition
}
