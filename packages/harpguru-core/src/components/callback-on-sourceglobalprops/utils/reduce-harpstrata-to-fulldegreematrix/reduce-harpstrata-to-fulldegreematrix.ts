import type { HarpStrata } from 'harpstrata'
import type { Degree, HarpFaceMatrices } from 'harpparts'

import { isMatchHarpFaceFacts } from '../../../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const reduceHarpStrataToFullDegreeMatrix = (
  prevDegreeMatrix: HarpFaceMatrices<Degree>,
  harpStrata: HarpStrata
): HarpFaceMatrices<Degree> => {
  const { degreeMatrix: nextDegreeMatrix } = harpStrata
  if (
    isMatchHarpFaceFacts(
      doSparceIdedObjectMatricesMatch,
      prevDegreeMatrix,
      nextDegreeMatrix
    )
  )
    return prevDegreeMatrix
  return nextDegreeMatrix
}
