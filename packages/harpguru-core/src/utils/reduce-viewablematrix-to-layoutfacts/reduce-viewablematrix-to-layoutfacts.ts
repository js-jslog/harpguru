import { isChromaticHarpFace } from 'harpparts'
import type { HarpFaceMatrices } from 'harpparts'

import { isMatchHighOrderTuples } from '../ismatch-highordertuples'
import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import type { LayoutFacts } from '../../types'
// TODO: this was always a mistake and should be corrected
import { isMatchLayoutFacts } from '../../components/callback-on-sourceglobalprops/utils/ismatch-layoutfacts'

export const reduceViewableMatrixToLayoutFacts = <T>(
  prevLayoutFacts: readonly [LayoutFacts, LayoutFacts],
  viewableMatrix: HarpFaceMatrices<T>
): readonly [LayoutFacts, LayoutFacts] => {
  const nextLayoutFacts = [
    {
      harpfaceColumns: determineMatrixDimensions(viewableMatrix.harpface1)
        .columns,
      harpfaceRows: determineMatrixDimensions(viewableMatrix.harpface1).rows,
    },
    {
      harpfaceColumns: isChromaticHarpFace(viewableMatrix)
        ? determineMatrixDimensions(viewableMatrix.harpface2).columns
        : 0,
      harpfaceRows: isChromaticHarpFace(viewableMatrix)
        ? determineMatrixDimensions(viewableMatrix.harpface2).rows
        : 0,
    },
  ] as const

  if (
    isMatchHighOrderTuples(isMatchLayoutFacts, prevLayoutFacts, nextLayoutFacts)
  )
    return prevLayoutFacts
  return nextLayoutFacts
}
