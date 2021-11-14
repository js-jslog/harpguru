import { HarpFaceMatrices, isChromaticHarpFace } from 'harpparts'

import { isMatchHarpFaceMatrices } from '../ismatch-harpfacematrices'
import { isPopulatedArray } from '../is-populated-array'
import type { ColumnBounds } from '../../types'
import { sliceMatrix } from '../../packages/slice-matrix'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'
import type { IdedObject } from '../../packages/do-sparce-ided-object-matrices-match'

export const reduceFullMatrixToViewableMatrix = <T extends IdedObject>(
  prevViewableMatrices: HarpFaceMatrices<T>,
  fullMatrix: HarpFaceMatrices<T>,
  columnBounds: ColumnBounds
): HarpFaceMatrices<T> => {
  if (columnBounds === 'FIT') {
    if (
      isMatchHarpFaceMatrices(
        doSparceIdedObjectMatricesMatch,
        prevViewableMatrices,
        fullMatrix
      )
    )
      return prevViewableMatrices
    return fullMatrix
  }

  const [start, end] = columnBounds

  const nextViewableMatrices = (() => {
    const harpface1 = sliceMatrix(fullMatrix.harpface1, start, end + 1).filter(
      isPopulatedArray
    )
    if (isChromaticHarpFace(fullMatrix))
      return {
        harpface1,
        harpface2: sliceMatrix(fullMatrix.harpface2, start, end + 1).filter(
          isPopulatedArray
        ),
      }
    return { harpface1 }
  })()

  if (
    isMatchHarpFaceMatrices(
      doSparceIdedObjectMatricesMatch,
      prevViewableMatrices,
      nextViewableMatrices
    )
  )
    return prevViewableMatrices

  return nextViewableMatrices
}
