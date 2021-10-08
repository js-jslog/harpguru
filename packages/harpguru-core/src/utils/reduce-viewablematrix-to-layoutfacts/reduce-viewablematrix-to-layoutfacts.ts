import type { HarpFaceMatrix } from 'harpparts'

import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import type { LayoutFacts } from '../../types'
import { isMatchLayoutFacts } from '../../components/callback-on-sourceglobalprops/utils/ismatch-layoutfacts'

export const reduceViewableMatrixToLayoutFacts = <T>(
  prevLayoutFacts: LayoutFacts,
  viewableMatrix: HarpFaceMatrix<T>
): LayoutFacts => {
  const { columns: columnCount, rows: rowCount } = determineMatrixDimensions(
    viewableMatrix
  )
  const nextLayoutFacts = {
    harpfaceColumns: columnCount,
    harpfaceRows: rowCount,
  }

  if (isMatchLayoutFacts(prevLayoutFacts, nextLayoutFacts))
    return prevLayoutFacts
  return nextLayoutFacts
}
