import type { HarpFaceMatrix } from 'harpparts'

import {isMatchHighOrderTuples} from '../ismatch-highordertuples'
import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import type { LayoutFacts } from '../../types'
// TODO: this was always a mistake and should be corrected
import { isMatchLayoutFacts } from '../../components/callback-on-sourceglobalprops/utils/ismatch-layoutfacts'

export const reduceViewableMatrixToLayoutFacts = <T>(
  prevLayoutFacts: readonly [LayoutFacts, LayoutFacts],
  viewableMatrix: readonly [HarpFaceMatrix<T>, HarpFaceMatrix<T>]
): readonly [LayoutFacts, LayoutFacts] => {
  const nextLayoutFacts = [
    {
      harpfaceColumns: determineMatrixDimensions(viewableMatrix[0]).columns,
      harpfaceRows: determineMatrixDimensions(viewableMatrix[0]).rows
    },{
      harpfaceColumns: determineMatrixDimensions(viewableMatrix[1]).columns,
      harpfaceRows: determineMatrixDimensions(viewableMatrix[1]).rows
    }
  ] as const

  if (isMatchHighOrderTuples(isMatchLayoutFacts, prevLayoutFacts, nextLayoutFacts))
    return prevLayoutFacts
  return nextLayoutFacts
}
