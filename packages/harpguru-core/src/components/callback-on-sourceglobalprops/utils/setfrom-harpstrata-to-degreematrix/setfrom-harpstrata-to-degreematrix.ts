import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Degree } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const setFromHarpStrataToDegreeMatrix = (
  newHarpStrata: HarpStrata,
  prevDegreeMatrix: HarpFaceMatrix<Degree>,
  setDegreeMatrix: (arg0: HarpFaceMatrix<Degree>) => void
): HarpFaceMatrix<Degree> => {
  const { degreeMatrix: newDegreeMatrix } = newHarpStrata
  if (!doSparceIdedObjectMatricesMatch(prevDegreeMatrix, newDegreeMatrix))
    setDegreeMatrix(newDegreeMatrix)
  return newDegreeMatrix
}
