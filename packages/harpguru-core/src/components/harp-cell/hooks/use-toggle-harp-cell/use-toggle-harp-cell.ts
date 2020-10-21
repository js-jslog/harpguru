import { useGlobal } from 'reactn'
import { DegreeIds } from 'harpstrata'

import { toggleDegreeIdInHarpStrata } from '../../utils'

type ToggleHarpCell = (arg0: DegreeIds) => void

export const useToggleHarpCell = (): ToggleHarpCell => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')

  return (degreeId: DegreeIds) => {
    setActiveHarpStrata(toggleDegreeIdInHarpStrata(activeHarpStrata, degreeId))
  }
}
