import type { Dispatch } from 'reactn/default'
import type { HarpStrata } from 'harpstrata'

import { reduceNewHarpStrataForViewableDegreeMatrix } from '../reduce-new-harpstrata-for-viewable-degree-matrix'
import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import { compareLayoutFacts } from '../compare-layout-facts'
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
  const newLayoutFacts = {
    harpfaceColumns: columnCount,
    harpfaceRows: rowCount,
  }

  const { layoutFacts } = global
  if (compareLayoutFacts(layoutFacts, newLayoutFacts)) return { layoutFacts }
  return {
    layoutFacts: newLayoutFacts,
  }
}
