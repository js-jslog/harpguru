import type { Dispatch } from 'reactn/default'

import {
  determineMatrixDimensions,
  determineNextColumnBounds,
  compareColumnBounds,
} from '../../../../utils'
import { ZoomIds } from '../../../../types'
import type { GlobalState } from '../../../../types'

export const reduceForNewColumnBoundsByZoomId = (
  global: GlobalState,
  _dipatch: Dispatch,
  zoomId: ZoomIds
): Pick<GlobalState, 'columnBounds'> => {
  const { columnBounds, activeDegreeMatrix } = global
  const { columns: columnCount } = determineMatrixDimensions(activeDegreeMatrix)
  const newColumnBounds = determineNextColumnBounds(
    columnCount,
    columnBounds,
    zoomId
  )

  if (compareColumnBounds(columnBounds, newColumnBounds))
    return {
      columnBounds,
    }
  return {
    columnBounds: newColumnBounds,
  }
}
