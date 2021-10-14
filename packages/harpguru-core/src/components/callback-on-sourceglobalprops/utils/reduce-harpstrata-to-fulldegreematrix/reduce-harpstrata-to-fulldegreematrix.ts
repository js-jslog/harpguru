import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Degree } from 'harpparts'

import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const reduceHarpStrataToFullDegreeMatrix = (
  prevDegreeMatrix: HarpFaceMatrix<Degree>,
  harpStrata: HarpStrata
): HarpFaceMatrix<Degree> => {
  const { degreeMatrix: nextDegreeMatrix } = harpStrata
  if (doSparceIdedObjectMatricesMatch(prevDegreeMatrix, nextDegreeMatrix))
    return prevDegreeMatrix
  return nextDegreeMatrix
}
