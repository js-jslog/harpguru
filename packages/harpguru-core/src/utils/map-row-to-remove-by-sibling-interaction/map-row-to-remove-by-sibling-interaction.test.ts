import {
  InteractionIds,
  getDegree,
  DegreeIds,
  getPitch,
  PitchIds,
} from 'harpparts'

import { mapRowToRemoveBySiblingInteraction } from './map-row-to-remove-by-sibling-interaction'

const ROOT = getDegree(DegreeIds.Root)
const SECOND = getDegree(DegreeIds.Second)
const THIRD = getDegree(DegreeIds.Third)

const C = getPitch(PitchIds.C)
const D = getPitch(PitchIds.D)
const E = getPitch(PitchIds.E)

const { Draw, DrawBend1, OverDraw1 } = InteractionIds
const DRAW = { id: Draw } as const
const DRAW_BEND_1 = { id: DrawBend1 } as const
const OVERDRAW_1 = { id: OverDraw1 } as const

test('a strictly equal output is provided when no remove interactions are defined', () => {
  const degreeRow = [ROOT, SECOND, THIRD, undefined]
  const pitchRow = [C, D, E, undefined]
  const interactionMatrix = [[DRAW_BEND_1, DRAW_BEND_1, DRAW_BEND_1, undefined]]
  const removeInteractionIds = [] as ReadonlyArray<InteractionIds>
  const interactionInfo = {
    interactionMatrix,
    removeInteractionIds,
  }

  expect(
    mapRowToRemoveBySiblingInteraction(interactionInfo, degreeRow, 0)
  ).toStrictEqual(degreeRow)
  expect(
    mapRowToRemoveBySiblingInteraction(interactionInfo, pitchRow, 0)
  ).toStrictEqual(pitchRow)
})

test('a row can have all of its items removed when its sibling interaction is marked for removal', () => {
  const degreeRow = [ROOT, SECOND, THIRD, undefined]
  const pitchRow = [C, D, E, undefined]
  const interactionMatrix = [[DRAW_BEND_1, DRAW_BEND_1, DRAW_BEND_1, undefined]]
  const removeInteractionIds = [
    InteractionIds.DrawBend1,
  ] as ReadonlyArray<InteractionIds>
  const interactionInfo = {
    interactionMatrix,
    removeInteractionIds,
  }
  const expectedMappedRow = [undefined, undefined, undefined, undefined]

  expect(
    mapRowToRemoveBySiblingInteraction(interactionInfo, degreeRow, 0)
  ).toStrictEqual(expectedMappedRow)
  expect(
    mapRowToRemoveBySiblingInteraction(interactionInfo, pitchRow, 0)
  ).toStrictEqual(expectedMappedRow)
})

test('a row can have some of its items removed when its sibling interaction is marked for removal', () => {
  const degreeRow = [ROOT, SECOND, THIRD, undefined]
  const pitchRow = [C, D, E, undefined]
  const interactionMatrix = [[DRAW_BEND_1, DRAW_BEND_1, OVERDRAW_1, undefined]]
  const removeInteractionIds = [
    InteractionIds.DrawBend1,
  ] as ReadonlyArray<InteractionIds>
  const interactionInfo = {
    interactionMatrix,
    removeInteractionIds,
  }
  const expectedMappedDegreeRow = [undefined, undefined, THIRD, undefined]
  const expectedMappedPitchRow = [undefined, undefined, E, undefined]

  expect(
    mapRowToRemoveBySiblingInteraction(interactionInfo, degreeRow, 0)
  ).toStrictEqual(expectedMappedDegreeRow)
  expect(
    mapRowToRemoveBySiblingInteraction(interactionInfo, pitchRow, 0)
  ).toStrictEqual(expectedMappedPitchRow)
})

test('a mapped entire matrix can be output when used as a callback to a map function', () => {
  const degreeMatrix = [
    [ROOT, SECOND, THIRD, undefined],
    [THIRD, ROOT, THIRD, SECOND],
  ]
  const interactionMatrix = [
    [DRAW, DRAW, DRAW, undefined],
    [DRAW_BEND_1, DRAW_BEND_1, OVERDRAW_1, DRAW_BEND_1],
  ]
  const removeInteractionIds = [
    InteractionIds.Draw,
    InteractionIds.DrawBend1,
  ] as ReadonlyArray<InteractionIds>
  const supplementaryInfo = {
    interactionMatrix,
    removeInteractionIds,
  }
  const mappedDegreeMatrix = degreeMatrix.map(
    mapRowToRemoveBySiblingInteraction.bind(undefined, supplementaryInfo)
  )
  const expectedMappedDegreeMatrix = [
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, THIRD, undefined],
  ]

  expect(mappedDegreeMatrix).toStrictEqual(expectedMappedDegreeMatrix)
})
