import {
  InteractionIds,
  getDegree,
  DegreeIds,
  getPitch,
  PitchIds,
} from 'harpparts'

import { mapMatrixToRemoveBySiblingInteraction } from './map-matrix-to-remove-by-sibling-interaction'

const ROOT = getDegree(DegreeIds.Root)
const SECOND = getDegree(DegreeIds.Second)
const THIRD = getDegree(DegreeIds.Third)

const C = getPitch(PitchIds.C)
const D = getPitch(PitchIds.D)
const E = getPitch(PitchIds.E)

const { DrawBend1, OverDraw1 } = InteractionIds
const DRAW_BEND_1 = { id: DrawBend1 } as const
const OVERDRAW_1 = { id: OverDraw1 } as const

test('a strictly equal output is provided when no remove interactions are defined', () => {
  const degreeMatrix = [
    [ROOT, SECOND, THIRD, undefined],
    [undefined, SECOND, THIRD, undefined],
    [ROOT, SECOND, undefined, undefined],
  ]
  const pitchMatrix = [
    [C, D, E, undefined],
    [undefined, D, E, undefined],
    [C, D, undefined, undefined],
  ]
  const interactionMatrix = [
    [DRAW_BEND_1, DRAW_BEND_1, DRAW_BEND_1, undefined],
    [DRAW_BEND_1, DRAW_BEND_1, DRAW_BEND_1, undefined],
    [DRAW_BEND_1, DRAW_BEND_1, DRAW_BEND_1, undefined],
  ]
  const removeInteractionIds = [] as ReadonlyArray<InteractionIds>
  const interactionInfo = {
    interactionMatrix,
    removeInteractionIds,
  }

  expect(
    mapMatrixToRemoveBySiblingInteraction({
      ...interactionInfo,
      matrix: degreeMatrix,
    })
  ).toStrictEqual(degreeMatrix)
  expect(
    mapMatrixToRemoveBySiblingInteraction({
      ...interactionInfo,
      matrix: pitchMatrix,
    })
  ).toStrictEqual(pitchMatrix)
})

test('a matrix can have all of its items removed when its sibling interaction is marked for removal', () => {
  const degreeMatrix = [
    [ROOT, SECOND, THIRD, undefined],
    [undefined, SECOND, THIRD, undefined],
    [ROOT, SECOND, undefined, undefined],
  ]
  const pitchMatrix = [
    [C, D, E, undefined],
    [undefined, D, E, undefined],
    [C, D, undefined, undefined],
  ]
  const interactionMatrix = [
    [DRAW_BEND_1, DRAW_BEND_1, DRAW_BEND_1, undefined],
    [DRAW_BEND_1, DRAW_BEND_1, DRAW_BEND_1, undefined],
    [DRAW_BEND_1, DRAW_BEND_1, DRAW_BEND_1, undefined],
  ]
  const removeInteractionIds = [
    InteractionIds.DrawBend1,
  ] as ReadonlyArray<InteractionIds>
  const interactionInfo = {
    interactionMatrix,
    removeInteractionIds,
  }
  const expectedMappedMatrix = [
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
  ]

  expect(
    mapMatrixToRemoveBySiblingInteraction({
      ...interactionInfo,
      matrix: degreeMatrix,
    })
  ).toStrictEqual(expectedMappedMatrix)
  expect(
    mapMatrixToRemoveBySiblingInteraction({
      ...interactionInfo,
      matrix: pitchMatrix,
    })
  ).toStrictEqual(expectedMappedMatrix)
})

test('a matrix can have some of its items removed when its sibling interaction is marked for removal', () => {
  const degreeMatrix = [
    [ROOT, SECOND, THIRD, undefined],
    [undefined, SECOND, THIRD, undefined],
    [ROOT, SECOND, undefined, undefined],
  ]
  const pitchMatrix = [
    [C, D, E, undefined],
    [undefined, D, E, undefined],
    [C, D, undefined, undefined],
  ]
  const interactionMatrix = [
    [DRAW_BEND_1, DRAW_BEND_1, OVERDRAW_1, undefined],
    [undefined, DRAW_BEND_1, OVERDRAW_1, undefined],
    [DRAW_BEND_1, DRAW_BEND_1, undefined, undefined],
  ]
  const removeInteractionIds = [
    InteractionIds.DrawBend1,
  ] as ReadonlyArray<InteractionIds>
  const interactionInfo = {
    interactionMatrix,
    removeInteractionIds,
  }
  const expectedMappedDegreeMatrix = [
    [undefined, undefined, THIRD, undefined],
    [undefined, undefined, THIRD, undefined],
    [undefined, undefined, undefined, undefined],
  ]
  const expectedMappedPitchMatrix = [
    [undefined, undefined, E, undefined],
    [undefined, undefined, E, undefined],
    [undefined, undefined, undefined, undefined],
  ]

  expect(
    mapMatrixToRemoveBySiblingInteraction({
      ...interactionInfo,
      matrix: degreeMatrix,
    })
  ).toStrictEqual(expectedMappedDegreeMatrix)
  expect(
    mapMatrixToRemoveBySiblingInteraction({
      ...interactionInfo,
      matrix: pitchMatrix,
    })
  ).toStrictEqual(expectedMappedPitchMatrix)
})
