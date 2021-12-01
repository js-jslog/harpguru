import { useGlobal } from 'reactn'
import type { Degree, HarpFaceMatrix } from 'harpparts'

import { extractHarpFaceFacts } from '../../utils'
import { transposeMatrix } from '../../packages/transpose-matrix'

import { getOctaveColumnGroups } from './get-octave-column-groups'
import type { ColumnRanges } from './get-octave-column-groups'
import { arrayHasRoot } from './array-has-root'

export const useOctaveColumnGroups = (): ColumnRanges => {
  const [degreeMatrix] = useGlobal('activeDegreeMatrix')
  const [columnBounds] = useGlobal('columnBounds')

  const columnsFirstDegreeMatrix = transposeMatrix(
    extractHarpFaceFacts(degreeMatrix, 'harpface1')
  ) as HarpFaceMatrix<Degree>
  const rootColumnsMask = columnsFirstDegreeMatrix.map(arrayHasRoot)
  const octaveColumnGroups = getOctaveColumnGroups(rootColumnsMask)

  if (columnBounds === 'FIT') return octaveColumnGroups

  const [startColumn, endColumn] = columnBounds

  const viewableColumnGroups = octaveColumnGroups
    .map((group) => {
      return group.filter((index) => index >= startColumn && index <= endColumn)
    })
    .filter((group) => group.length > 0)

  return viewableColumnGroups
}
