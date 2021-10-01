import type { HarpFaceMatrix, Degree } from 'harpparts'

import { determineMatrixDimensions } from '../../../../utils'

type LayoutFacts = {
  readonly harpfaceColumns: number
  readonly harpfaceRows: number
}

export const deriveLayoutFacts = (
  viewableDegreeMatrix: HarpFaceMatrix<Degree>
): LayoutFacts => {
  const { columns: columnCount, rows: rowCount } = determineMatrixDimensions(
    viewableDegreeMatrix
  )

  const newLayoutFacts = {
    harpfaceColumns: columnCount,
    harpfaceRows: rowCount,
  }
  return newLayoutFacts
}
