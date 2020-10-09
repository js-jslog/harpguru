import { useGlobal } from 'reactn'
import { getHarpStrata } from 'harpstrata'
import type { ApparatusIds } from 'harpstrata'

import { getPropsForHarpStrata } from '../../../../utils'
import { DisplayModes } from '../../../../types'

export const useSetHarpStrataByApparatus = (): (arg0: ApparatusIds) => void => {
  const [ activeHarpStrata, setActiveHarpStrata ] = useGlobal('activeHarpStrata')

  const setHarpStrataByApparatus = (apparatusId: ApparatusIds) => {
    const nextHarpStrataProps = getPropsForHarpStrata(
      {
        ...activeHarpStrata,
        apparatus: {
          ...activeHarpStrata.apparatus,
          id: apparatusId,
        },
      },
      DisplayModes.Degree
    )

    setActiveHarpStrata(getHarpStrata(nextHarpStrataProps))
  }

  return setHarpStrataByApparatus
}
