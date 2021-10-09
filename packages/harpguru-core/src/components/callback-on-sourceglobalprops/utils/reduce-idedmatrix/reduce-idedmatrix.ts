import type { HarpFaceMatrix } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'
import type { IdedObject } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const reduceIdedMatrix = <T extends IdedObject>(
  prevMatrix: HarpFaceMatrix<T>,
  nextMatrix: HarpFaceMatrix<T>
): HarpFaceMatrix<T> => {
  if (doSparceIdedObjectMatricesMatch(prevMatrix, nextMatrix)) return prevMatrix
  return nextMatrix
}
