import type { Hole } from '../../types'

import { mapHoleToFilterOverbends } from './map-hole-to-filter-overbends'

test('mapHoleToFilterOverbends returns a single hole unmodified', () => {
  const input: [Hole] = [
    {
      blow: 9,
      draw: 10,
      blowbends: [],
      drawbends: [],
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
      blowbends: [],
      drawbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 11,
      draw: 12,
      blowbends: [],
      drawbends: [],
      overblows: [13],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 9,
      draw: 10,
      blowbends: [],
      drawbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
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
      blowbends: [],
      drawbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 10,
      draw: 11,
      blowbends: [],
      drawbends: [],
      overblows: [12],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 9,
      draw: 10,
      blowbends: [],
      drawbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
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
      blowbends: [],
      drawbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 10,
      draw: 14,
      blowbends: [],
      drawbends: [11, 12, 13],
      overblows: [15],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 9,
      draw: 10,
      blowbends: [],
      drawbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
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
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 11,
      draw: 10,
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [12],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 10,
      draw: 9,
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 10,
    draw: 9,
    blowbends: [],
    drawbends: [],
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
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 12,
      draw: 11,
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [13],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 10,
      draw: 9,
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 10,
    draw: 9,
    blowbends: [],
    drawbends: [],
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
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 14,
      draw: 10,
      blowbends: [11, 12, 13],
      drawbends: [],
      overblows: [],
      overdraws: [15],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 10,
      draw: 9,
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 10,
    draw: 9,
    blowbends: [],
    drawbends: [],
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

test('mapHoleToFilterOverbends filters an overblow if theres an alternative valvebend to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 9,
      draw: 10,
      blowbends: [],
      drawbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 12,
      draw: 14,
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [],
      valvedblows: [11],
      valveddraws: [],
    },
    {
      blow: 9,
      draw: 10,
      blowbends: [],
      drawbends: [],
      overblows: [11],
      overdraws: [],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
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

test('mapHoleToFilterOverbends filters an overdraw if theres an alternative valvedblow to the right or left', () => {
  const input: Hole[] = [
    {
      blow: 10,
      draw: 9,
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
    {
      blow: 14,
      draw: 12,
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [],
      valvedblows: [],
      valveddraws: [11],
    },
    {
      blow: 10,
      draw: 9,
      blowbends: [],
      drawbends: [],
      overblows: [],
      overdraws: [11],
      valvedblows: [],
      valveddraws: [],
    },
  ]

  const expectedOutput = {
    blow: 10,
    draw: 9,
    blowbends: [],
    drawbends: [],
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
