import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Pitch } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const setFromHarpStrataToPitchMatrix = (
  harpStrata: HarpStrata,
  prevPitchMatrix: HarpFaceMatrix<Pitch>,
  setPitchMatrix: (arg0: HarpFaceMatrix<Pitch>) => void
): HarpFaceMatrix<Pitch> => {
  const { pitchMatrix: nextPitchMatrix } = harpStrata
  if (!doSparceIdedObjectMatricesMatch(prevPitchMatrix, nextPitchMatrix))
    setPitchMatrix(nextPitchMatrix)
  return nextPitchMatrix
}
