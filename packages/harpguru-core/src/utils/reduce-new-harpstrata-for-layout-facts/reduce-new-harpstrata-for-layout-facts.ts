import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { reduceNewHarpStrataForViewableDegreeMatrix } from '../reduce-new-harpstrata-for-viewable-degree-matrix'
import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import type { GlobalState } from '../../types'

// TODO: Copied from `reduceNewHarpStrataForViewableDegreeMatrix``
// Make sure to add unit tests for the return value
// equality checks, and create a util for all the logic
// preseding that.
// Make sure to create shared functions for shared functionality.
export const reduceNewHarpStrataForLayoutFacts = (
  global: GlobalState,
  _dipatch: Dispatch,
  newHarpStrata: HarpStrata
): Pick<GlobalState, 'layoutFacts'> => {
  const { layoutFacts } = global
  const { harpfaceColumns, harpfaceRows } = layoutFacts
  const {
    viewableDegreeMatrix: newViewableDegreeMatrix,
  } = reduceNewHarpStrataForViewableDegreeMatrix(
    global,
    _dipatch,
    newHarpStrata
  )
  const { columns: columnCount, rows: rowCount } = determineMatrixDimensions(
    newViewableDegreeMatrix
  )

  if (rowCount === harpfaceRows && columnCount === harpfaceColumns)
    return {
      layoutFacts,
    }

  return {
    layoutFacts: {
      harpfaceColumns: columnCount,
      harpfaceRows: rowCount,
    },
  }
}
