import type { DegreeMatrix } from '../types'
import { getDegree, getAscendingDegreeIds, getDescendingDegreeIds } from '../degreeMap'
import type { HalfstepIndexMatrix, HalfstepIndex } from '../../Apparatus'


export const getDegreeMatrix = (halfstepIndexMatrix: HalfstepIndexMatrix, root: HalfstepIndex): DegreeMatrix => {
  const { [root]: rootDegreeId } = getDescendingDegreeIds()
  const ascendingDegreeIdsFromHarpRoot = getAscendingDegreeIds(rootDegreeId)

  return halfstepIndexMatrix.map((halfstepIndexRow) => {
    return halfstepIndexRow.map((halfstepIndex) => {
      if (halfstepIndex === undefined) return undefined
      return getDegree(ascendingDegreeIdsFromHarpRoot[halfstepIndex % 12])
    })
  })
}
