import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { deriveActivePitchIds } from '../../utils'
import { compareActiveIds } from '../../../../utils/compare-active-ids'

export const useDeriveActivePitchIds = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [prevActivePitchIds, setActivePitchIds] = useGlobal('activePitchIds')

  useEffect(() => {
    const nextActivePitchIds = deriveActivePitchIds(activeHarpStrata)
    if (compareActiveIds(nextActivePitchIds, prevActivePitchIds)) return
    console.log(':::::::::::::::::::::::::::::::::: active pitch ids changed')
    setActivePitchIds(nextActivePitchIds)
  }, [activeHarpStrata, prevActivePitchIds, setActivePitchIds])
}
