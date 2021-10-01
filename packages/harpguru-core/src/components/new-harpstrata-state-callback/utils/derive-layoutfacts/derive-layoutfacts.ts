import type { HarpStrata } from 'harpstrata'

import { deriveViewableDegreeMatrix } from '../derive-viewabledegreematrix'
import { determineMatrixDimensions } from '../../../../utils'

type LayoutFacts = {
  readonly harpfaceColumns: number
  readonly harpfaceRows: number
}

export const deriveLayoutFacts = (
  activeHarpStrata: HarpStrata,
  prevColumnBounds: 'FIT' | readonly [number, number]
): LayoutFacts => {
  const newViewableDegreeMatrix = deriveViewableDegreeMatrix(
    activeHarpStrata,
    prevColumnBounds
  )

  const { columns: columnCount, rows: rowCount } = determineMatrixDimensions(
    newViewableDegreeMatrix
  )
  const newLayoutFacts = {
    harpfaceColumns: columnCount,
    harpfaceRows: rowCount,
  }
  return newLayoutFacts
}
