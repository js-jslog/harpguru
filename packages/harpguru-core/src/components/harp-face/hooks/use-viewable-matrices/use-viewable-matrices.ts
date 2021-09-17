import { useGlobal } from 'reactn'
import type { Degree, HarpFaceMatrix } from 'harpparts'

import { sliceMatrix } from '../../../../packages/slice-matrix'

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

  return {
    viewableDegreeMatrix: sliceMatrix(
      activeHarpStrata.degreeMatrix,
      start,
      end + 1
    ),
  }
}
