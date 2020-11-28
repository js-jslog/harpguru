import { useGlobal } from 'reactn'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { PitchIds } from 'harpparts'
import { getCovariantSet, CovariantMembers } from 'harpcovariance'

type SetPozitionRoot = (arg0: PitchIds | undefined) => void

export const useSetPozitionRoot = (): SetPozitionRoot => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [lockedCovariant] = useGlobal('lockedCovariant')
  const {
    harpKeyId: activeHarpKeyId,
    rootPitchId: activeRootPitchId,
  } = activeHarpStrata
  const activeHarpStrataProps = getPropsForHarpStrata(
    activeHarpStrata,
    'DEGREE'
  )
  return (newRootPitchId: PitchIds | undefined) => {
    if (newRootPitchId === undefined) return
    const covariantControllers = {
      harpKeyId: activeHarpKeyId,
      rootPitchId: newRootPitchId,
    }
    const { pozitionId: newPozitionId } = getCovariantSet(covariantControllers)
    if (lockedCovariant === CovariantMembers.HarpKey) {
      const newActiveHarpStrata = getHarpStrata({
        ...activeHarpStrataProps,
        harpKeyId: activeHarpKeyId,
        pozitionId: newPozitionId,
      })
      setActiveHarpStrata(newActiveHarpStrata)
    } else {
      const covariantControllers2 = {
        rootPitchId: activeRootPitchId,
        pozitionId: newPozitionId,
      }
      const { harpKeyId: newHarpKeyId } = getCovariantSet(covariantControllers2)
      const newActiveHarpStrata = getHarpStrata({
        ...activeHarpStrataProps,
        harpKeyId: newHarpKeyId,
        pozitionId: newPozitionId,
      })
      setActiveHarpStrata(newActiveHarpStrata)
    }
  }
}
