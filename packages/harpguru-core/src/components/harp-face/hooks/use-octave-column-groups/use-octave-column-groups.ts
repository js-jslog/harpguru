import { useGlobal } from 'reactn'
import type { Degree, HarpFaceMatrix } from 'harpparts'

import { transposeMatrix } from '../../../../packages/transpose-matrix'

import { getOctaveColumnGroups } from './get-octave-column-groups'
import type { ColumnRanges } from './get-octave-column-groups'
import { arrayHasRoot } from './array-has-root'

export const useOctaveColumnGroups = (): ColumnRanges => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { degreeMatrix } = activeHarpStrata

  const columnsFirstDegreeMatrix = transposeMatrix(
    degreeMatrix
  ) as HarpFaceMatrix<Degree>
  const rootColumnsMask = columnsFirstDegreeMatrix.map(arrayHasRoot)
  const octaveColumnGroups = getOctaveColumnGroups(rootColumnsMask)

  return octaveColumnGroups
}
