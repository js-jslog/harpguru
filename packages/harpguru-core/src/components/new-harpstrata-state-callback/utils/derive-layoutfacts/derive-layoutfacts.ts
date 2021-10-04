import type { HarpFaceMatrix, Interaction } from 'harpparts'

import { determineMatrixDimensions } from '../../../../utils'

type LayoutFacts = {
  readonly harpfaceColumns: number
  readonly harpfaceRows: number
}

export const deriveLayoutFacts = (
  viewableInteractionMatrix: HarpFaceMatrix<Interaction>
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
