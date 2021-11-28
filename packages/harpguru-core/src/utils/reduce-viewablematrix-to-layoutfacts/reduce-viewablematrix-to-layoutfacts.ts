import { mapHarpFaceFacts } from 'harpparts'
import type { HarpFaceFacts, HarpFaceMatrix, HarpFaceMatrices } from 'harpparts'

import { isMatchHarpFaceFacts } from '../ismatch-harpfacefacts'
import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import type { LayoutFacts } from '../../types'
// TODO: this was always a mistake and should be corrected
import { isMatchLayoutFacts } from '../../components/callback-on-sourceglobalprops/utils/ismatch-layoutfacts'

export const reduceViewableMatrixToLayoutFacts = <T>(
  prevLayoutFacts: HarpFaceFacts<LayoutFacts>,
  viewableMatrices: HarpFaceMatrices<T>
): HarpFaceFacts<LayoutFacts> => {
  const mapFunction = (viewableMatrix: HarpFaceMatrix<T>) => ({
    harpfaceColumns: determineMatrixDimensions(viewableMatrix).columns,
    harpfaceRows: determineMatrixDimensions(viewableMatrix).rows,
  })
  const nextLayoutFacts = mapHarpFaceFacts(viewableMatrices, mapFunction)

  if (
    isMatchHarpFaceFacts(isMatchLayoutFacts, prevLayoutFacts, nextLayoutFacts)
  )
    return prevLayoutFacts
  return nextLayoutFacts
}
