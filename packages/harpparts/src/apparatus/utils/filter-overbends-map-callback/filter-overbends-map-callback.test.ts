import type { Hole } from '../../types'

import { filterOverbendsMapCallback } from './filter-overbends-map-callback'

test('filterOverbendsMapCallback returns a single hole unmodified', () => {
  const input: [Hole] = [
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [],
    },
  ]

  const output = filterOverbendsMapCallback(input[0], 0, input)

  expect(output).toStrictEqual(input[0])
})

test('filterOverbendsMapCallback filters an overblow if theres an alternative blow to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
    },
    {
      blow: 11,
      draw: 12,
      bends: [],
      blowbends: [],
      overblows: [13],
      overdraws: [],
    },
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  expect(filterOverbendsMapCallback(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(filterOverbendsMapCallback(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})

test('filterOverbendsMapCallback filters an overblow if theres an alternative draw to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
    },
    {
      blow: 10,
      draw: 11,
      bends: [],
      blowbends: [],
      overblows: [12],
      overdraws: [],
    },
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  expect(filterOverbendsMapCallback(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(filterOverbendsMapCallback(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})

test('filterOverbendsMapCallback filters an overblow if theres an alternative bend to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
    },
    {
      blow: 10,
      draw: 14,
      bends: [11, 12, 13],
      blowbends: [],
      overblows: [15],
      overdraws: [],
    },
    {
      blow: 9,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [11],
      overdraws: [],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  expect(filterOverbendsMapCallback(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(filterOverbendsMapCallback(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})

test('filterOverbendsMapCallback filters an overdraw if theres an alternative blow to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
    },
    {
      blow: 11,
      draw: 10,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [12],
    },
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
    },
  ]

  const expectedOutput = {
    blow: 10,
    draw: 9,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  expect(filterOverbendsMapCallback(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(filterOverbendsMapCallback(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})

test('filterOverbendsMapCallback filters an overdraw if theres an alternative draw to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
    },
    {
      blow: 12,
      draw: 11,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [13],
    },
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
    },
  ]

  const expectedOutput = {
    blow: 10,
    draw: 9,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  expect(filterOverbendsMapCallback(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(filterOverbendsMapCallback(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})

test('filterOverbendsMapCallback filters an overdraw if theres an alternative blowbend to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
    },
    {
      blow: 14,
      draw: 10,
      bends: [],
      blowbends: [11, 12, 13],
      overblows: [],
      overdraws: [15],
    },
    {
      blow: 10,
      draw: 9,
      bends: [],
      blowbends: [],
      overblows: [],
      overdraws: [11],
    },
  ]

  const expectedOutput = {
    blow: 10,
    draw: 9,
    bends: [],
    blowbends: [],
    overblows: [],
    overdraws: [],
  }

  expect(filterOverbendsMapCallback(input[0], 0, input)).toStrictEqual(
    expectedOutput
  )
  expect(filterOverbendsMapCallback(input[2], 2, input)).toStrictEqual(
    expectedOutput
  )
})
