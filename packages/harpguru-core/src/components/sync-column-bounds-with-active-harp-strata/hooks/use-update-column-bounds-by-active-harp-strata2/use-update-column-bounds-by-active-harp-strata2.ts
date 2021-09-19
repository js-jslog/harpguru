import { useGlobal } from 'reactn'

import { determineNextColumnBounds } from '../../utils'
import { determineZoomId } from '../../../menu-of-tunings/utils/get-new-column-bounds-for-dispatcher/determine-zoom-id'

export const useUpdateColumnBoundsByActiveHarpStrata2 = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { degreeMatrix: activeDegreeMatrix } = activeHarpStrata
  const [columnBounds, setColumnBounds] = useGlobal('columnBounds')
  const { [0]: exampleHarpRow } = activeDegreeMatrix
  const { length: activeColumnCount } = exampleHarpRow
  const zoomId = determineZoomId(columnBounds)
  const newColumnBounds = determineNextColumnBounds(
    activeColumnCount,
    columnBounds,
    zoomId
  )
  //setColumnBounds(newColumnBounds)
  if (columnBounds === 'FIT') {
    if (newColumnBounds !== 'FIT') setColumnBounds(newColumnBounds)
  } else {
    const [oldStart, oldEnd] = columnBounds
    const [newStart, newEnd] = newColumnBounds
    if (oldStart !== newStart && oldEnd !== newEnd)
      setColumnBounds(newColumnBounds)
  }
}
