import type { DegreeMatrix } from 'harpstrata'

import { transposeMatrix } from '../transposeMatrix'
import { getOctaveColumnGroups } from '../getOctaveColumnGroups'
import type { ColumnRanges } from '../getOctaveColumnGroups'
import { arrayHasRoot } from '../arrayHasRoot'
import type { HarpFaceProps } from '../../types'

type HarpFaceFacts = {
  readonly rowCount: number
  readonly columnCount: number
  readonly octaveColumnGroups: ColumnRanges
}

export const getHarpFaceFacts = (props: HarpFaceProps): HarpFaceFacts => {
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
