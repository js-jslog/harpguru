import { getPitch, getPitchIds } from 'harpparts'
import type { HarpFaceMatrix, Pitch, PitchIds, HalfstepIndex } from 'harpparts'

export const getPitchMatrix = (
  halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>,
  keyPitchId: PitchIds
): HarpFaceMatrix<Pitch> => {
  const ascendingPitchIdsInKey = getPitchIds(keyPitchId)

  return halfstepIndexMatrix.map((halfstepIndexRow) => {
    return halfstepIndexRow.map((halfstepIndex) => {
      if (halfstepIndex === undefined) return undefined
      return getPitch(ascendingPitchIdsInKey[halfstepIndex % 12])
    })
  })
}
