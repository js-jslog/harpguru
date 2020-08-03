import { useGlobal } from 'reactn'
import { DegreeIds } from 'harpstrata'

import { toggleDegreeIdInHarpStrata } from '../../utils'

type ToggleHarpCell = (arg0: DegreeIds | undefined) => void

export const useToggleHarpCell = (): ToggleHarpCell => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')

  return (degreeId: DegreeIds | undefined) => {
    if (degreeId === undefined) return
    setActiveHarpStrata(toggleDegreeIdInHarpStrata(activeHarpStrata, degreeId))
  }
}
