import type { HarpFaceMatrix } from 'harpparts'

import { deriveViewableMatrix } from '../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'
import type { IdedObject } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const useDeriveViewableMatrix = <T extends IdedObject>(
  nextMatrix: HarpFaceMatrix<T>,
  nextColumnBounds: 'FIT' | readonly [number, number],
  prevViewableMatrix: HarpFaceMatrix<T>,
  setViewableMatrix: (arg0: HarpFaceMatrix<T>) => void
): HarpFaceMatrix<T> => {
  const nextViewableMatrix = deriveViewableMatrix(nextMatrix, nextColumnBounds)
  if (!doSparceIdedObjectMatricesMatch(prevViewableMatrix, nextViewableMatrix))
    setViewableMatrix(nextViewableMatrix)
  return nextViewableMatrix
}
