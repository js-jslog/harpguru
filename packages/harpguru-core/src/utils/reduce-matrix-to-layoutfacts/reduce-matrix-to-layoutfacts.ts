import { mapHarpFaceFacts } from 'harpparts'
import type { HarpFaceFacts, HarpFaceMatrix, HarpFaceMatrices } from 'harpparts'

import { isMatchLayoutFacts } from '../ismatch-layoutfacts'
import { isMatchHarpFaceFacts } from '../ismatch-harpfacefacts'
import { determineMatrixDimensions } from '../determine-matrix-dimensions'
import type { LayoutFacts } from '../../types'

export const reduceMatrixToLayoutFacts = <T>(
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
