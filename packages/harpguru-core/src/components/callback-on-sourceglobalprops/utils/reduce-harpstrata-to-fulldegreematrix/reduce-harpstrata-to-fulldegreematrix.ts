import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Degree } from 'harpparts'

import { isMatchHighOrderTuples } from '../../../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const reduceHarpStrataToFullDegreeMatrix = (
  prevDegreeMatrix: readonly [HarpFaceMatrix<Degree>, HarpFaceMatrix<Degree>],
  harpStrata: HarpStrata
): readonly [HarpFaceMatrix<Degree>, HarpFaceMatrix<Degree>] => {
  const { degreeMatrix: nextDegreeMatrix } = harpStrata
  if (
    isMatchHighOrderTuples(
      doSparceIdedObjectMatricesMatch,
      prevDegreeMatrix,
      nextDegreeMatrix
    )
  )
    return prevDegreeMatrix
  return nextDegreeMatrix
}
