import type { HarpStrata } from 'harpstrata'
import type { Degree, HarpFaceMatrix } from 'harpparts'

import { transposeMatrix } from '../../../../packages/transpose-matrix'

import { getOctaveColumnGroups } from './get-octave-column-groups'
import type { ColumnRanges } from './get-octave-column-groups'
import { arrayHasRoot } from './array-has-root'

type HarpFaceFacts = {
  readonly octaveColumnGroups: ColumnRanges
}

export const getHarpFaceFacts = (
  activeHarpStrata: HarpStrata
): HarpFaceFacts => {
  const { degreeMatrix } = activeHarpStrata

  const columnsFirstDegreeMatrix = transposeMatrix(
    degreeMatrix
  ) as HarpFaceMatrix<Degree>
  const rootColumnsMask = columnsFirstDegreeMatrix.map(arrayHasRoot)
  const octaveColumnGroups = getOctaveColumnGroups(rootColumnsMask)

  return {
    octaveColumnGroups,
  }
}
