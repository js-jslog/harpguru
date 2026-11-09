import { getHarpStrata } from 'harpstrata'
import {
  InteractionIds,
  PitchIds,
  ScaleCategory,
  ValvingIds,
  getDegreeIds,
  getScale,
  getScaleIds,
} from 'harpparts'
import type {
  DegreeIds,
  PozitionIds,
  ScaleIds,
  TuningIds,
  HarpFaceMatrix,
  Interaction,
  Degree,
} from 'harpparts'

// The degrees a tuning plays in a pozition with no bends: its blow and draw
// notes only. The harp key doesn't matter, since degrees are relative to the
// pozition's root.
export const getUnbentDegrees = (
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
  const found = new Set<DegreeIds>()
  const faces = Object.keys(interactionMatrix) as Array<
    keyof typeof interactionMatrix
  >
  faces.forEach((face) => {
    const interactions = interactionMatrix[face] as HarpFaceMatrix<Interaction>
    const degrees = degreeMatrix[face] as HarpFaceMatrix<Degree>
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
  })
  return getDegreeIds().filter((degreeId) => found.has(degreeId))
}

// The named scale made of exactly a tuning's unbent degrees in a pozition, if
// there is one. Chords are left out: a tuning page shows what a harp is built
// to play, and that is a scale.
export const getUnbentScale = (
  tuningId: TuningIds,
  pozitionId: PozitionIds
): ScaleIds | undefined => {
  const unbent = getUnbentDegrees(tuningId, pozitionId)
  return getScaleIds().find((scaleId) => {
    const { category, degrees } = getScale(scaleId)
    return (
      category === ScaleCategory.Scale &&
      degrees.length === unbent.length &&
      degrees.every((degreeId) => unbent.includes(degreeId))
    )
  })
}
