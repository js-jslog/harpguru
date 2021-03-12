import { getPitch, getPitchIds, reversePreserveOrigin } from 'harpparts'
import type { HarpFaceMatrix, Pitch, PitchIds, HalfstepIndex } from 'harpparts'

export const getPitchMatrix = (
  halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>,
  keyPitchId: PitchIds
): HarpFaceMatrix<Pitch> => {
  const ascendingPitchIdsInKey = getPitchIds(keyPitchId)
  const descendingPitchIdsInKey = reversePreserveOrigin(ascendingPitchIdsInKey)

  return halfstepIndexMatrix.map((halfstepIndexRow) => {
    return halfstepIndexRow.map((halfstepIndex) => {
      if (halfstepIndex === undefined) return undefined
      if (halfstepIndex < 0)
        return getPitch(descendingPitchIdsInKey[(halfstepIndex * -1) % 12])
      return getPitch(ascendingPitchIdsInKey[halfstepIndex % 12])
    })
  })
}
