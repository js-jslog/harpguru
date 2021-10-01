import type { HarpFaceMatrix, Pitch } from 'harpparts'

import { deriveViewablePitchMatrix } from '../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const useDeriveViewablePitchMatrix = (
  nextPitchMatrix: HarpFaceMatrix<Pitch>,
  nextColumnBounds: 'FIT' | readonly [number, number],
  prevViewablePitchMatrix: HarpFaceMatrix<Pitch>,
  setViewablePitchMatrix: (arg0: HarpFaceMatrix<Pitch>) => void
): HarpFaceMatrix<Pitch> => {
  const nextViewablePitchMatrix = deriveViewablePitchMatrix(
    nextPitchMatrix,
    nextColumnBounds
  )
  if (
    !doSparceIdedObjectMatricesMatch(
      prevViewablePitchMatrix,
      nextViewablePitchMatrix
    )
  )
    setViewablePitchMatrix(nextViewablePitchMatrix)
  return nextViewablePitchMatrix
}
