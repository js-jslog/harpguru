import type { Hole } from '../../types'
import { ValvingIds } from '../../../valving'

import { mapHoleToIncludeValvebends } from './map-hole-to-include-valvebends'

test('mapHoleToIncludeValvebends returns the input hole if there is no valving', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const actualHoleOutput = mapHoleToIncludeValvebends(
    ValvingIds.NotValved,
    holeInput
  )

  expect(actualHoleOutput).toStrictEqual(holeInput)
})

test('mapHoleToIncludeValvebends adds a valved blow bend when the blow reed is lower', () => {
  const holeInput: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    valvedblows: [8],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(
    ValvingIds.HalfValved,
    holeInput
  )

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeValvebends adds a valved draw bend when draw reed is lower', () => {
  const holeInput: Hole = {
    blow: 10,
    draw: 9,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    valveddraws: [8],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(
    ValvingIds.HalfValved,
    holeInput
  )

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

// Half-valving should usually place the valve on the higher of the two reeds. When they are both
// the same, where should the valve go? I argue that you might as well have a valve on each reed
// since otherwise you have no bends at all. Valving is the only way to get any kind of bend in
// this situation.
test('mapHoleToIncludeValvebends adds both a valved blow and a valved draw bend when the reeds are the same', () => {
  const holeInput: Hole = {
    blow: 8,
    draw: 8,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    valvedblows: [7],
    valveddraws: [7],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(
    ValvingIds.HalfValved,
    holeInput
  )

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})

test('mapHoleToIncludeValvebends adds a valvebend when the blow reed is 0', () => {
  const holeInput: Hole = {
    blow: 0,
    draw: 2,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedHoleOutput: Hole = {
    ...holeInput,
    valvedblows: [-1],
  }
  const actualHoleOutput = mapHoleToIncludeValvebends(
    ValvingIds.HalfValved,
    holeInput
  )

  expect(actualHoleOutput).toStrictEqual(expectedHoleOutput)
})
