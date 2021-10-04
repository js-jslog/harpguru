import type { HarpFaceMatrix } from 'harpparts'

import { determineMatrixDimensions } from '../../../../utils'

type LayoutFacts = {
  readonly harpfaceColumns: number
  readonly harpfaceRows: number
}

export const reduceViewableMatrixToLayoutFacts = <T>(
  viewableInteractionMatrix: HarpFaceMatrix<T>
): LayoutFacts => {
  const { columns: columnCount, rows: rowCount } = determineMatrixDimensions(
    viewableInteractionMatrix
  )

  const newLayoutFacts = {
    harpfaceColumns: columnCount,
    harpfaceRows: rowCount,
  }
  return newLayoutFacts
}
