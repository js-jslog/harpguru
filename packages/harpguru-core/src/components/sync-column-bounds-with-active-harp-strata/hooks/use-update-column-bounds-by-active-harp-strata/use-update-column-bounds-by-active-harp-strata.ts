import { useDispatch, useGlobal, useCallback } from 'reactn'
import { useEffect } from 'react'

// TODO: Move these files somewhere more communal
import { getNewColumnBoundsForDispatcher } from '../../../menu-of-tunings/utils'

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
