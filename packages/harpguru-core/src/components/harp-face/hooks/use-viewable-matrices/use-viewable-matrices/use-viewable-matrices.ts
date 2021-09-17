import { useGlobal } from 'reactn'
import type { Degree, HarpFaceMatrix } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import { sliceMatrix } from '../../../../../packages/slice-matrix'

type ViewableMatrices = {
  viewableDegreeMatrix: HarpFaceMatrix<Degree>
}

export const useViewableMatrices = (): ViewableMatrices => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [columnBounds] = useGlobal('columnBounds')

  if (columnBounds === 'FIT')
    return {
      viewableDegreeMatrix: activeHarpStrata.degreeMatrix,
    }

  const [start, end] = columnBounds

  const limitedColumns = sliceMatrix(
    activeHarpStrata.degreeMatrix,
    start,
    end + 1
  )

  const viewableDegreeMatrix = limitedColumns.filter(isPopulatedArray)

  return {
    viewableDegreeMatrix,
  }
}
