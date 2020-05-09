import { MAJOR_DIATONIC_APPARATUS } from '../Apparatus/constants'

import { EXAMPLE_PITCH_MATRICES } from './testResources'

import { PitchIds } from './types'
import type { Pitch } from './types'
import { getPitchMatrix, getActivePitchIds, getPitch } from './index'
import { C, F } from './constants'


test('getActivePitchIds function returns an array of the available pitches', () => {
  const expectedIncludes = [ PitchIds.C, PitchIds.Db ]
  const actualArray = getActivePitchIds()

  expect(actualArray).toEqual(expect.arrayContaining(expectedIncludes))
})

test('getPitch function can return a first pozition', () => {
  const C_PITCH: Pitch = { id: PitchIds.C } as const
  const actualPitch = getPitch(C_PITCH.id)

  expect(actualPitch).toStrictEqual(C_PITCH)
})

test('getPitchMatrix function maps a simple 2d array of 0\'s to the input key pitch of C', () => {
  const expectedArray = [[ C, ], [ C, ]]
  const actualArray = getPitchMatrix([[ 0, ], [ 0, ]], C.id)

  expect(actualArray).toStrictEqual(expectedArray)
})

test('getPitchMatrix maps a major diatonic halfstepmatrix in to a major diatonic pitchMatrix for a C harmonica', () => {
  const { MAJOR_DIATONIC_C_HARMONICA } = EXAMPLE_PITCH_MATRICES
  const actualArray = getPitchMatrix(MAJOR_DIATONIC_APPARATUS.halfstepIndexMatrix, C.id)

  expect(actualArray).toStrictEqual(MAJOR_DIATONIC_C_HARMONICA)
})

test('getPitchMatrix maps a major diatonic halfstepmatrix in to a major diatonic pitchMatrix for a F harmonica', () => {
  const { MAJOR_DIATONIC_F_HARMONICA } = EXAMPLE_PITCH_MATRICES
  const actualArray = getPitchMatrix(MAJOR_DIATONIC_APPARATUS.halfstepIndexMatrix, F.id)

  expect(actualArray).toStrictEqual(MAJOR_DIATONIC_F_HARMONICA)
})
