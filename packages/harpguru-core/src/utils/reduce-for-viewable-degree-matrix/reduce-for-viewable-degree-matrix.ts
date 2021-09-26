import type { Dispatch } from 'reactn/default'
import type { HarpFaceMatrix, Degree } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import type { GlobalState } from '../../types'
import { sliceMatrix } from '../../packages/slice-matrix'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'

export const reduceForViewableDegreeMatrix = (
  global: GlobalState,
  _dipatch: Dispatch,
  newActiveDegreeMatrix: HarpFaceMatrix<Degree>,
  newColumnBounds: 'FIT' | readonly [number, number]
): Pick<GlobalState, 'viewableDegreeMatrix'> => {
  const { viewableDegreeMatrix } = global

  if (newColumnBounds === 'FIT') {
    if (
      doSparceIdedObjectMatricesMatch(
        newActiveDegreeMatrix,
        viewableDegreeMatrix
      )
    ) {
      return { viewableDegreeMatrix }
    }
    return {
      viewableDegreeMatrix: newActiveDegreeMatrix,
    }
  }

  const [start, end] = newColumnBounds

  const newViewableDegreeMatrix = sliceMatrix(
    newActiveDegreeMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

  if (
    doSparceIdedObjectMatricesMatch(
      newViewableDegreeMatrix,
      viewableDegreeMatrix
    )
  ) {
    return {
      viewableDegreeMatrix,
    }
  }
  return {
    viewableDegreeMatrix: newViewableDegreeMatrix,
  }
}
