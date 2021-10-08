import type { HarpFaceMatrix } from 'harpparts'

import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import type { LayoutFacts } from '../../types'

export const reduceViewableMatrixToLayoutFacts = <T>(
  viewableMatrix: HarpFaceMatrix<T>
): LayoutFacts => {
  const { columns: columnCount, rows: rowCount } = determineMatrixDimensions(
    viewableMatrix
  )

  const newLayoutFacts = {
    harpfaceColumns: columnCount,
    harpfaceRows: rowCount,
  }
  return newLayoutFacts
}
