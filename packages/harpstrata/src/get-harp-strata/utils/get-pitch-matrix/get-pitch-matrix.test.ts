import {
  buildApparatus,
  TuningIds,
  getPitch,
  PitchIds,
  ValvingIds,
} from 'harpparts'

import { EXAMPLE_PITCH_MATRICES } from '../../testResources'

import { getPitchMatrix } from './index'

const c = getPitch(PitchIds.C)
const b = getPitch(PitchIds.B)
const aFlat = getPitch(PitchIds.Ab)

test('getPitchMatrix function maps a simple 2d array of 0s to the input key pitch of C', () => {
  const expectedArray = [[c], [c]]
  const actualArray = getPitchMatrix([[0], [0]], c.id)

  expect(actualArray).toStrictEqual(expectedArray)
})

test('getPitchMatrix maps a major diatonic halfstepmatrix in to a major diatonic pitchMatrix for a C harmonica', () => {
  const {
    majorDiatonic: {
      cHarp: {
        notValved: {
          pitchMatrix: { harpface1: expectedPitchMatrix },
        },
      },
    },
  } = EXAMPLE_PITCH_MATRICES
  const actualArray = getPitchMatrix(
    buildApparatus(TuningIds.MajorDiatonic, ValvingIds.NotValved)
      .halfstepIndexMatrix.harpface1,
    c.id
  )

  expect(actualArray).toStrictEqual(expectedPitchMatrix)
})

test('getPitchMatrix maps a major diatonic halfstepmatrix in to a major diatonic pitchMatrix for a F harmonica', () => {
  const {
    majorDiatonic: {
      fHarp: {
        notValved: {
          pitchMatrix: { harpface1: expectedPitchMatrix },
        },
      },
    },
  } = EXAMPLE_PITCH_MATRICES
  const actualArray = getPitchMatrix(
    buildApparatus(TuningIds.MajorDiatonic, ValvingIds.NotValved)
      .halfstepIndexMatrix.harpface1,
    PitchIds.F
  )

  expect(actualArray).toStrictEqual(expectedPitchMatrix)
})

test('getPitchMatrix function maps a simple 2d array of -1s to Bs for a C harmonica', () => {
  const expectedArray = [[b], [b]]
  const actualArray = getPitchMatrix([[-1], [-1]], PitchIds.C)

  expect(actualArray).toStrictEqual(expectedArray)
})

test('getPitchMatrix function maps a simple 2d array of -13s to Abs for an A harmonica', () => {
  const expectedArray = [[aFlat], [aFlat]]
  const actualArray = getPitchMatrix([[-13], [-13]], PitchIds.A)

  expect(actualArray).toStrictEqual(expectedArray)
})
