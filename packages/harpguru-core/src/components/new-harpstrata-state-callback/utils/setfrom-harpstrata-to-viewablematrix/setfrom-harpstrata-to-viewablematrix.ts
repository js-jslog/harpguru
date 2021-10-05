import type { HarpFaceMatrix } from 'harpparts'

import { reduceHarpStrataToViewableMatrix } from '../reduce-harpstrata-to-viewablematrix'
import type { ColumnBounds } from '../../../../types'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'
import type { IdedObject } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const setFromHarpStrataToViewableMatrix = <T extends IdedObject>(
  nextMatrix: HarpFaceMatrix<T>,
  nextColumnBounds: ColumnBounds,
  prevViewableMatrix: HarpFaceMatrix<T>,
  setViewableMatrix: (arg0: HarpFaceMatrix<T>) => void
): HarpFaceMatrix<T> => {
  const nextViewableMatrix = reduceHarpStrataToViewableMatrix(
    nextMatrix,
    nextColumnBounds
  )
  if (!doSparceIdedObjectMatricesMatch(prevViewableMatrix, nextViewableMatrix))
    setViewableMatrix(nextViewableMatrix)
  return nextViewableMatrix
}
