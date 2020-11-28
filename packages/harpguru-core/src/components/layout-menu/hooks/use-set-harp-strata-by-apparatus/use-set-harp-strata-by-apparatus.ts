import { useGlobal } from 'reactn'
import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { ApparatusIds } from 'harpparts'

export const useSetHarpStrataByApparatus = (): ((
  arg0: ApparatusIds
) => void) => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')

  const setHarpStrataByApparatus = (apparatusId: ApparatusIds) => {
    const nextHarpStrataProps = getPropsForHarpStrata(
      {
        ...activeHarpStrata,
        apparatus: {
          ...activeHarpStrata.apparatus,
          id: apparatusId,
        },
      },
      'DEGREE'
    )

    setActiveHarpStrata(getHarpStrata(nextHarpStrataProps))
  }

  return setHarpStrataByApparatus
}
