import type { DegreeMatrix, HarpStrata } from 'harpstrata'

import { transposeMatrix } from '../transposeMatrix'
import { getOctaveColumnGroups } from '../getOctaveColumnGroups'
import type { ColumnRanges } from '../getOctaveColumnGroups'
import { arrayHasRoot } from '../arrayHasRoot'

type HarpFaceFacts = {
  readonly rowCount: number
  readonly columnCount: number
  readonly octaveColumnGroups: ColumnRanges
}

type Props = {
  readonly activeHarpStrata: HarpStrata
}

export const getHarpFaceFacts = (props: Props): HarpFaceFacts => {
  const {
    activeHarpStrata: { degreeMatrix },
  } = props

  const { length: rowCount } = degreeMatrix
  const {
    [0]: { length: columnCount },
  } = degreeMatrix

  const columnsFirstDegreeMatrix = transposeMatrix(degreeMatrix) as DegreeMatrix
  const rootColumnsMask = columnsFirstDegreeMatrix.map(arrayHasRoot)
  const octaveColumnGroups = getOctaveColumnGroups(rootColumnsMask)

  return {
    rowCount,
    columnCount,
    octaveColumnGroups,
  }
}