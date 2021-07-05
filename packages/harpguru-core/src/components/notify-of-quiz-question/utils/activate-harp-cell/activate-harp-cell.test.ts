import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps, ActiveIds } from 'harpstrata'
import {
  TuningIds,
  DegreeIds,
  PitchIds,
  PozitionIds,
  ValvingIds,
} from 'harpparts'

import { activateHarpCell } from './activate-harp-cell'

const allActiveDegrees = [
  DegreeIds.Root,
  DegreeIds.Flat2,
  DegreeIds.Second,
  DegreeIds.Flat3,
  DegreeIds.Third,
  DegreeIds.Fourth,
  DegreeIds.Flat5,
  DegreeIds.Fifth,
  DegreeIds.Flat6,
  DegreeIds.Sixth,
  DegreeIds.Flat7,
  DegreeIds.Seventh,
]
const baseHarpStrataProps: HarpStrataProps = {
  tuningId: TuningIds.Richter,
  valvingId: ValvingIds.NotValved,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [] as ActiveIds,
}
const inactiveCellsHarpStrataProps = baseHarpStrataProps
const activeCellsHarpStrataProps = {
  ...baseHarpStrataProps,
  activeIds: allActiveDegrees,
}

const inactiveCellsHarpStrata = getHarpStrata(inactiveCellsHarpStrataProps)
const activeCellsHarpStrata = getHarpStrata(activeCellsHarpStrataProps)

test('that a harpstrata with a deactivated cell will have that cell activated when given its degree', () => {
  const expectedHarpStrata = getHarpStrata({
    ...inactiveCellsHarpStrataProps,
    activeIds: [DegreeIds.Root],
  })
  const actualHarpStrata = activateHarpCell(
    inactiveCellsHarpStrata,
    DegreeIds.Root
  )

  expect(actualHarpStrata).toStrictEqual(expectedHarpStrata)
})

test('that a harpstrata with an active cell will remain the same when given its degree', () => {
  const actualHarpStrata = activateHarpCell(
    activeCellsHarpStrata,
    DegreeIds.Third
  )

  expect(actualHarpStrata).toStrictEqual(activeCellsHarpStrata)
})

test('that a harpstrata with a deactivated cell will have that cell activated when given its pitch', () => {
  const expectedHarpStrata = getHarpStrata({
    ...inactiveCellsHarpStrataProps,
    activeIds: [PitchIds.F],
  })
  const actualHarpStrata = activateHarpCell(inactiveCellsHarpStrata, PitchIds.F)

  expect(actualHarpStrata).toStrictEqual(expectedHarpStrata)
})

test('that a harpstrata with an active cell will remain the same when given its pitch', () => {
  const actualHarpStrata = activateHarpCell(activeCellsHarpStrata, PitchIds.G)

  expect(actualHarpStrata).toStrictEqual(activeCellsHarpStrata)
})
