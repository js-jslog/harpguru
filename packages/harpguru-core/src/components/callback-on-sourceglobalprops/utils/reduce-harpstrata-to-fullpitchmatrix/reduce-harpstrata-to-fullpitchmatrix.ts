import type { HarpStrata } from 'harpstrata'
import type { HarpFaceMatrix, Pitch } from 'harpparts'

import { isMatchHighOrderTuples } from '../../../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const reduceHarpStrataToFullPitchMatrix = (
  prevPitchMatrix: readonly [HarpFaceMatrix<Pitch>, HarpFaceMatrix<Pitch>],
  harpStrata: HarpStrata
): readonly [HarpFaceMatrix<Pitch>, HarpFaceMatrix<Pitch>] => {
  const { pitchMatrix: nextPitchMatrix } = harpStrata
  if (
    isMatchHighOrderTuples(
      doSparceIdedObjectMatricesMatch,
      prevPitchMatrix,
      nextPitchMatrix
    )
  )
    return prevPitchMatrix
  return nextPitchMatrix
}
