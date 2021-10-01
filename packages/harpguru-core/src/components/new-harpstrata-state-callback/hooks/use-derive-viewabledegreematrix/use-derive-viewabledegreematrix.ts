import type { HarpFaceMatrix, Degree } from 'harpparts'

import { deriveViewableDegreeMatrix } from '../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const useDeriveViewableDegreeMatrix = (
  nextDegreeMatrix: HarpFaceMatrix<Degree>,
  nextColumnBounds: 'FIT' | readonly [number, number],
  prevViewableDegreeMatrix: HarpFaceMatrix<Degree>,
  setViewableDegreeMatrix: (arg0: HarpFaceMatrix<Degree>) => void
): HarpFaceMatrix<Degree> => {
  const nextViewableDegreeMatrix = deriveViewableDegreeMatrix(
    nextDegreeMatrix,
    nextColumnBounds
  )
  if (
    !doSparceIdedObjectMatricesMatch(
      prevViewableDegreeMatrix,
      nextViewableDegreeMatrix
    )
  )
    setViewableDegreeMatrix(nextViewableDegreeMatrix)
  return nextViewableDegreeMatrix
}
