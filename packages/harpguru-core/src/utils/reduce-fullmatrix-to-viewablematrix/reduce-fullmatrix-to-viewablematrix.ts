import { HarpFaceMatrices, isChromaticHarpFace } from 'harpparts'

import { trimFullMatrixByColumnBounds } from '../trim-fullmatrix-by-columnbounds'
import { isMatchHarpFaceMatrices } from '../ismatch-harpfacematrices'
import { isPopulatedArray } from '../is-populated-array'
import type { ColumnBounds } from '../../types'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'
import type { IdedObject } from '../../packages/do-sparce-ided-object-matrices-match'

export const reduceFullMatrixToViewableMatrix = <T extends IdedObject>(
  prevViewableMatrices: HarpFaceMatrices<T>,
  fullMatrix: HarpFaceMatrices<T>,
  columnBounds: ColumnBounds
): HarpFaceMatrices<T> => {
  const nextViewableMatrix = (() => {
    const harpface1 = trimFullMatrixByColumnBounds(
      fullMatrix.harpface1,
      columnBounds
    ).filter(isPopulatedArray)
    if (isChromaticHarpFace(fullMatrix)) {
      const harpface2 = trimFullMatrixByColumnBounds(
        fullMatrix.harpface2,
        columnBounds
      ).filter(isPopulatedArray)
      return {
        harpface1,
        harpface2,
      }
    }
    return {
      harpface1,
    }
  })()

  if (
    isMatchHarpFaceMatrices(
      doSparceIdedObjectMatricesMatch,
      prevViewableMatrices,
      nextViewableMatrix
    )
  )
    return prevViewableMatrices
  return nextViewableMatrix
}
