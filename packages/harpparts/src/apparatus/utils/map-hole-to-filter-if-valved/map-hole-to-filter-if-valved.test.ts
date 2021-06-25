import type { Hole } from '../../types'

import { mapHoleToFilterIfValved } from './map-hole-to-filter-if-valved'

test('mapHoleToFilterIfValved returns a hole without valved bends unchanged', () => {
  const input1: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    bends: [],
    overblows: [11],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const output1 = mapHoleToFilterIfValved(input1)
  expect(output1).toStrictEqual(input1)

  const input2: Hole = {
    blow: 9,
    draw: 11,
    blowbends: [],
    bends: [10],
    overblows: [12],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const output2 = mapHoleToFilterIfValved(input2)
  expect(output2).toStrictEqual(input2)

  const input3: Hole = {
    blow: 10,
    draw: 8,
    blowbends: [9],
    bends: [],
    overblows: [],
    overdraws: [11],
    valvedblows: [],
    valveddraws: [],
  }

  const output3 = mapHoleToFilterIfValved(input3)
  expect(output3).toStrictEqual(input3)
})

test('mapHoleToFilterIfValved removes blow type bends when a valved blow bend is present', () => {
  const input1: Hole = {
    blow: 9,
    draw: 11,
    blowbends: [],
    bends: [10],
    overblows: [12],
    overdraws: [],
    valvedblows: [8],
    valveddraws: [],
  }

  const output1 = mapHoleToFilterIfValved(input1)
  expect(output1).toStrictEqual({ ...input1, overblows: [] })

  // This captures a rare event where the lower reed is valved. If this scenario occured
  // then this is how we would expect it to behave. But it's unlikely that anyone would
  // want to do this since you end up with a worse blow bend than you would without the
  // valving. We may even add some error checking in the hole validator which throws an
  // error if this setup is detected. But here is not the place for presumptions of that
  // kind. Here we'll just work logically.
  const input2: Hole = {
    blow: 10,
    draw: 7,
    blowbends: [8, 9],
    bends: [],
    overblows: [],
    overdraws: [11],
    valvedblows: [9],
    valveddraws: [],
  }

  const output2 = mapHoleToFilterIfValved(input2)
  expect(output2).toStrictEqual({ ...input2, blowbends: [] })
})

test('mapHoleToFilterIfValved removes draw type bends when a valved draw bend is present', () => {
  const input1: Hole = {
    blow: 10,
    draw: 7,
    blowbends: [8, 9],
    bends: [],
    overblows: [],
    overdraws: [11],
    valvedblows: [],
    valveddraws: [6],
  }

  const output1 = mapHoleToFilterIfValved(input1)
  expect(output1).toStrictEqual({ ...input1, overdraws: [] })

  // This captures a rare event where the lower reed is valved. If this scenario occured
  // then this is how we would expect it to behave. But it's unlikely that anyone would
  // want to do this since you end up with a worse draw bend than you would without the
  // valving. We may even add some error checking in the hole validator which throws an
  // error if this setup is detected. But here is not the place for presumptions of that
  // kind. Here we'll just work logically.
  const input2: Hole = {
    blow: 9,
    draw: 11,
    blowbends: [],
    bends: [10],
    overblows: [12],
    overdraws: [],
    valvedblows: [],
    valveddraws: [10],
  }

  const output2 = mapHoleToFilterIfValved(input2)
  expect(output2).toStrictEqual({ ...input2, bends: [] })
})

// This is testing full valving which may or may not even be a setup which
// we make available. Having it theoretically available makes the function
// futureproof.
test('mapHoleToFilterIfValved removes draw & blow type bends when both valve bends are detected', () => {
  const input1: Hole = {
    blow: 10,
    draw: 7,
    blowbends: [8, 9],
    bends: [],
    overblows: [],
    overdraws: [11],
    valvedblows: [9],
    valveddraws: [6],
  }

  const output1 = mapHoleToFilterIfValved(input1)
  expect(output1).toStrictEqual({ ...input1, overdraws: [], blowbends: [] })

  const input2: Hole = {
    blow: 9,
    draw: 11,
    blowbends: [],
    bends: [10],
    overblows: [12],
    overdraws: [],
    valvedblows: [8],
    valveddraws: [10],
  }

  const output2 = mapHoleToFilterIfValved(input2)
  expect(output2).toStrictEqual({ ...input2, bends: [], overblows: [] })
})
