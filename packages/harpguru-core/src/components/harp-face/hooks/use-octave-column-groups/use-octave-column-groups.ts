import { useGlobal } from 'reactn'
import type { Degree, HarpFaceMatrix } from 'harpparts'

import { transposeMatrix } from '../../../../packages/transpose-matrix'

import { getOctaveColumnGroups } from './get-octave-column-groups'
import type { ColumnRanges } from './get-octave-column-groups'
import { arrayHasRoot } from './array-has-root'

export const useOctaveColumnGroups = (): ColumnRanges => {
  // TOOMANYRENDERS: We should ideall just have a global variable
  // which tells us how many columns the harpstrata has so that this
  // can just use be based on that value which won't update
  // unless the number of columns changes
  const [degreeMatrix] = useGlobal('activeDegreeMatrix')
  const [fragmentHarpFaceByOctaves] = useGlobal('fragmentHarpFaceByOctaves')
  const [columnBounds] = useGlobal('columnBounds')

  const columnsFirstDegreeMatrix = transposeMatrix(
    degreeMatrix
  ) as HarpFaceMatrix<Degree>
  const rootColumnsMask = columnsFirstDegreeMatrix.map(arrayHasRoot)
  const octaveColumnGroups = getOctaveColumnGroups(rootColumnsMask)

  if (columnBounds === 'FIT') {
    if (fragmentHarpFaceByOctaves) return octaveColumnGroups

    return [octaveColumnGroups.flat()]
  }

  const [startColumn, endColumn] = columnBounds

  const viewableColumnGroups = octaveColumnGroups
    .map((group) => {
      return group.filter((index) => index >= startColumn && index <= endColumn)
    })
    .filter((group) => group.length > 0)

  if (fragmentHarpFaceByOctaves) return viewableColumnGroups

  return [viewableColumnGroups.flat()]
}
