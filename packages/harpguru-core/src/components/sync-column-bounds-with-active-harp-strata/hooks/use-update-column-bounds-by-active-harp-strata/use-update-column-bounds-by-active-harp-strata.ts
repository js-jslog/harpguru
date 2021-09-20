import { useDispatch, useGlobal, useCallback } from 'reactn'
import { useEffect } from 'react'

import { getNewColumnBoundsForDispatcher } from '../../../../utils'

export const useUpdateColumnBoundsByActiveHarpStrata = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const columnBoundsUpdater = useCallback(
    useDispatch(getNewColumnBoundsForDispatcher),
    [useDispatch, getNewColumnBoundsForDispatcher]
  )
  useEffect(() => {
    columnBoundsUpdater()
  }, [activeHarpStrata, columnBoundsUpdater])
}