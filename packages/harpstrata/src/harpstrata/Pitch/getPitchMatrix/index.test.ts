import { PitchIds } from '../types'
import { EXAMPLE_PITCH_MATRICES } from '../testResources'
import { getPitch } from '../getPitch'
import { MAJOR_DIATONIC_APPARATUS } from '../../Apparatus'

import { getPitchMatrix } from './index'

const c = getPitch(PitchIds.C)

test('getPitchMatrix function maps a simple 2d array of 0\'s to the input key pitch of C', () => {
  const expectedArray = [[ c, ], [ c, ]]
  const actualArray = getPitchMatrix([[ 0, ], [ 0, ]], c.id)

  expect(actualArray).toStrictEqual(expectedArray)
})

test('getPitchMatrix maps a major diatonic halfstepmatrix in to a major diatonic pitchMatrix for a C harmonica', () => {
  const { MAJOR_DIATONIC_C_HARMONICA } = EXAMPLE_PITCH_MATRICES
  const actualArray = getPitchMatrix(MAJOR_DIATONIC_APPARATUS.halfstepIndexMatrix, c.id)

  expect(actualArray).toStrictEqual(MAJOR_DIATONIC_C_HARMONICA)
})

test('getPitchMatrix maps a major diatonic halfstepmatrix in to a major diatonic pitchMatrix for a F harmonica', () => {
  const { MAJOR_DIATONIC_F_HARMONICA } = EXAMPLE_PITCH_MATRICES
  const actualArray = getPitchMatrix(MAJOR_DIATONIC_APPARATUS.halfstepIndexMatrix, PitchIds.F)

  expect(actualArray).toStrictEqual(MAJOR_DIATONIC_F_HARMONICA)
})
