import type { Hole } from '../../types'

import { mapHoleToFilterOverbends } from './map-hole-to-filter-overbends'

test('mapHoleToFilterOverbends returns a single hole unmodified', () => {
  const input: [Hole] = [
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const output = mapHoleToFilterOverbends(input[0], 0, input)

  expect(output).toStrictEqual(input[0])
})

test('mapHoleToFilterOverbends filters an overblow if theres an alternative blow to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 11,
      draw: 12,
      bends: [],
      blowbends: [],
      overblows: [13],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  expect(mapHoleToFilterOverbends(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(mapHoleToFilterOverbends(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})

test('mapHoleToFilterOverbends filters an overblow if theres an alternative draw to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 10,
      draw: 11,
      bends: [],
      blowbends: [],
      overblows: [12],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  expect(mapHoleToFilterOverbends(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(mapHoleToFilterOverbends(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})

test('mapHoleToFilterOverbends filters an overblow if theres an alternative bend to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 10,
      draw: 14,
      bends: [11, 12, 13],
      blowbends: [],
      overblows: [15],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  expect(mapHoleToFilterOverbends(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(mapHoleToFilterOverbends(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})

test('mapHoleToFilterOverbends filters an overdraw if theres an alternative blow to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 11,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [12],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 10,
    draw: 9,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  expect(mapHoleToFilterOverbends(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(mapHoleToFilterOverbends(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})

test('mapHoleToFilterOverbends filters an overdraw if theres an alternative draw to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 12,
      draw: 11,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [13],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 10,
    draw: 9,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  expect(mapHoleToFilterOverbends(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(mapHoleToFilterOverbends(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})

test('mapHoleToFilterOverbends filters an overdraw if theres an alternative blowbend to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 14,
      draw: 10,
      bends: [],
      blowbends: [11, 12, 13],
      overblows: [],
      overdraws: [15],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 10,
    draw: 9,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  expect(mapHoleToFilterOverbends(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(mapHoleToFilterOverbends(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})
