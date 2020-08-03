import { useGlobal } from 'reactn'
import { getHarpStrata, getCovariantSet } from 'harpstrata'
import type { PitchIds } from 'harpstrata'

import { getPropsForHarpStrata } from '../../../../utils'
import { DisplayModes } from '../../../../types'

type SetPozitionRoot = (arg0: PitchIds | undefined) => void

export const useSetPozitionRoot = (): SetPozitionRoot => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const { harpKeyId: activeHarpKeyId } = activeHarpStrata
  const activeHarpStrataProps = getPropsForHarpStrata(
    activeHarpStrata,
    DisplayModes.Degree
  )
  return (newRootPitchId: PitchIds | undefined) => {
    if (newRootPitchId === undefined) return
    const covariantControllers = {
      harpKeyId: activeHarpKeyId,
      rootPitchId: newRootPitchId,
    }
    const { pozitionId: newPozitionId } = getCovariantSet(covariantControllers)
    const newActiveHarpStrata = getHarpStrata({
      ...activeHarpStrataProps,
      harpKeyId: activeHarpKeyId,
      pozitionId: newPozitionId,
    })
    setActiveHarpStrata(newActiveHarpStrata)
  }
}
