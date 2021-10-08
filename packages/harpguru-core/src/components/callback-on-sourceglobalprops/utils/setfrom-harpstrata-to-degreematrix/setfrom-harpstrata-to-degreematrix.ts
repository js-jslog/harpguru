import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Degree } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const setFromHarpStrataToDegreeMatrix = (
  harpStrata: HarpStrata,
  prevDegreeMatrix: HarpFaceMatrix<Degree>,
  setDegreeMatrix: (arg0: HarpFaceMatrix<Degree>) => void
): HarpFaceMatrix<Degree> => {
  const { degreeMatrix: nextDegreeMatrix } = harpStrata
  if (!doSparceIdedObjectMatricesMatch(prevDegreeMatrix, nextDegreeMatrix))
    setDegreeMatrix(nextDegreeMatrix)
  return nextDegreeMatrix
}
