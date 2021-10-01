import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { deriveActiveDegreeIds } from '../../utils'
import { compareActiveIds } from '../../../../utils/compare-active-ids'

export const useDeriveActiveDegreeIds = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [prevActiveDegreeIds, setActiveDegreeIds] = useGlobal('activeDegreeIds')

  useEffect(() => {
    const nextActiveDegreeIds = deriveActiveDegreeIds(activeHarpStrata)
    if (compareActiveIds(nextActiveDegreeIds, prevActiveDegreeIds)) return
    console.log(':::::::::::::::::::::::::::::::::: active degree ids changed')
    setActiveDegreeIds(nextActiveDegreeIds)
  }, [activeHarpStrata, prevActiveDegreeIds, setActiveDegreeIds])
}
