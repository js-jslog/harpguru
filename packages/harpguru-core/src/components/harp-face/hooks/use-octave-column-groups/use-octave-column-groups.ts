import type { Degree, HarpFaceMatrix } from 'harpparts'

import { extractHarpFaceFacts } from '../../../../utils'
import { useHarpGuruStore } from '../../../../store'
import { transposeMatrix } from '../../../../packages/transpose-matrix'

import { getOctaveColumnGroups } from './get-octave-column-groups'
import type { ColumnRanges } from './get-octave-column-groups'
import { arrayHasRoot } from './array-has-root'

export const useOctaveColumnGroups = (): ColumnRanges => {
  const viewableDegreeMatrices = useHarpGuruStore((state) => state.viewableDegreeMatrix)
  const columnBounds = useHarpGuruStore((state) => state.columnBounds)
  const fragmentHarpFaceByOctaves = useHarpGuruStore((state) => state.fragmentHarpFaceByOctaves)

  const octaveColumnGroups = (() => {
    const columnsFirstDegreeMatrix = transposeMatrix(
      extractHarpFaceFacts(viewableDegreeMatrices, 'harpface1')
    ) as HarpFaceMatrix<Degree>
    const rootColumnsMask = columnsFirstDegreeMatrix.map(arrayHasRoot)
    const unshiftedColumnGroups = getOctaveColumnGroups(rootColumnsMask).filter(
      (group) => group.length > 0
    )
    if (columnBounds == 'FIT') return unshiftedColumnGroups
    return unshiftedColumnGroups.map((group) =>
      group.map((index) => index + columnBounds[0])
    )
  })()

  if (fragmentHarpFaceByOctaves) return octaveColumnGroups
  return [octaveColumnGroups.flat()]
}
