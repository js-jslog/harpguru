import type { HarpStrata } from 'harpstrata'
import type { Degree, HarpFaceMatrix } from 'harpparts'

import { transposeMatrix } from '../../packages/transpose-matrix'

import { getOctaveColumnGroups } from './get-octave-column-groups'
import type { ColumnRanges } from './get-octave-column-groups'
import { arrayHasRoot } from './array-has-root'

type HarpFaceFacts = {
  readonly rowCount: number
  readonly columnCount: number
  readonly octaveColumnGroups: ColumnRanges
}

export const getHarpFaceFacts = (
  activeHarpStrata: HarpStrata,
  columnBounds?: readonly [number, number]
): HarpFaceFacts => {
  const { degreeMatrix } = activeHarpStrata
  const [startColumn, endColumn] = columnBounds || [0, 7]

  const { length: rowCount } = degreeMatrix
  const {
    [0]: { length: columnCount },
  } = degreeMatrix

  const columnsFirstDegreeMatrix = transposeMatrix(
    degreeMatrix
  ) as HarpFaceMatrix<Degree>
  const rootColumnsMask = columnsFirstDegreeMatrix.map(arrayHasRoot)
  const octaveColumnGroups = getOctaveColumnGroups(rootColumnsMask)
  // TODO: replace this horrible untested cobbling together
  const mapped = octaveColumnGroups.map((group) => {
    return group.filter((index) => index >= startColumn && index <= endColumn)
  })
  const truncatedOctaveColumnGroups = mapped.filter((group) => group.length > 0)

  return {
    rowCount,
    columnCount,
    octaveColumnGroups: truncatedOctaveColumnGroups,
  }
}
