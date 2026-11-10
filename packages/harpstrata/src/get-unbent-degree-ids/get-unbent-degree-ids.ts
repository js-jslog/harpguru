import {
  InteractionIds,
  PitchIds,
  ValvingIds,
  getDegreeIds,
  isChromaticHarpFace,
} from 'harpparts'
import type {
  Degree,
  DegreeIds,
  HarpFaceMatrix,
  Interaction,
  PozitionIds,
  TuningIds,
} from 'harpparts'

import { getHarpStrata } from '../get-harp-strata'

// The degrees a tuning plays in a pozition with no bends: its blow and draw
// notes only, in degree order. The harp key doesn't matter, since degrees are
// relative to the pozition's root.
export const getUnbentDegreeIds = (
  tuningId: TuningIds,
  pozitionId: PozitionIds
): ReadonlyArray<DegreeIds> => {
  const {
    apparatus: { interactionMatrix },
    degreeMatrix,
  } = getHarpStrata({
    tuningId,
    pozitionId,
    valvingId: ValvingIds.NotValved,
    harpKeyId: PitchIds.C,
    activeIds: [],
  })
  const faces: Array<[HarpFaceMatrix<Interaction>, HarpFaceMatrix<Degree>]> = [
    [interactionMatrix.harpface1, degreeMatrix.harpface1],
  ]
  if (
    isChromaticHarpFace(interactionMatrix) &&
    isChromaticHarpFace(degreeMatrix)
  ) {
    faces.push([interactionMatrix.harpface2, degreeMatrix.harpface2])
  }

  const found = new Set<DegreeIds>()
  faces.forEach(([interactions, degrees]) =>
    interactions.forEach((row, y) =>
      row.forEach((interaction, x) => {
        const isUnbent =
          interaction?.id === InteractionIds.Blow ||
          interaction?.id === InteractionIds.Draw
        const {
          [y]: { [x]: degree },
        } = degrees
        if (isUnbent && degree !== undefined) found.add(degree.id)
      })
    )
  )
  return getDegreeIds().filter((degreeId) => found.has(degreeId))
}
