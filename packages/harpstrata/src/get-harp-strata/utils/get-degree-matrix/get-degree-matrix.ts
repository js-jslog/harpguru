import { getDegree, getDegreeIds, reversePreserveOrigin } from 'harpparts'
import type { HarpFaceMatrix, Degree, HalfstepIndex } from 'harpparts'

export const getDegreeMatrix = (
  halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>,
  root: HalfstepIndex
): HarpFaceMatrix<Degree> => {
  const { [root]: rootDegreeId } = reversePreserveOrigin(getDegreeIds())
  const ascendingDegreeIdsFromHarpRoot = getDegreeIds(rootDegreeId)
  const descendingDegreeIdsFromHarpRoot = reversePreserveOrigin(
    getDegreeIds(rootDegreeId)
  )

  return halfstepIndexMatrix.map((halfstepIndexRow) => {
    return halfstepIndexRow.map((halfstepIndex) => {
      if (halfstepIndex === undefined) return undefined
      if (halfstepIndex < 0)
        return getDegree(
          descendingDegreeIdsFromHarpRoot[(halfstepIndex * -1) % 12]
        )
      return getDegree(ascendingDegreeIdsFromHarpRoot[halfstepIndex % 12])
    })
  })
}
