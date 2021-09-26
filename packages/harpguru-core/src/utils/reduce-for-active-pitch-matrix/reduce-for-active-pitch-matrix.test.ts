import type { Dispatch } from 'reactn/default'
import { getPitch, PitchIds, HarpFaceMatrix } from 'harpparts'
import type { Pitch } from 'harpparts'

import type { GlobalState } from '../../types'

import { reduceForActivePitchMatrix } from './reduce-for-active-pitch-matrix'

test('the original pitchMatrix gets returned from the reducer when new matches old', () => {
  const originalPitchMatrix = [
    [getPitch(PitchIds.A), getPitch(PitchIds.B), getPitch(PitchIds.C)],
    [getPitch(PitchIds.D), getPitch(PitchIds.E), getPitch(PitchIds.F)],
  ] as HarpFaceMatrix<Pitch>
  const newPitchMatrix = [
    [getPitch(PitchIds.A), getPitch(PitchIds.B), getPitch(PitchIds.C)],
    [getPitch(PitchIds.D), getPitch(PitchIds.E), getPitch(PitchIds.F)],
  ] as HarpFaceMatrix<Pitch>
  const global = {
    activePitchMatrix: originalPitchMatrix,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch

  const actualResult = reduceForActivePitchMatrix(
    global,
    unusedDispatcher,
    newPitchMatrix
  )
  const expectedResult = { activePitchMatrix: originalPitchMatrix }
  expect(actualResult).toStrictEqual(expectedResult)
  expect(
    Object.is(actualResult.activePitchMatrix, originalPitchMatrix)
  ).toBeTruthy()
  expect(Object.is(actualResult.activePitchMatrix, newPitchMatrix)).toBeFalsy()
})

test('a new pitchMatrix gets returned from the reducer', () => {
  const originalPitchMatrix = [
    [getPitch(PitchIds.A), getPitch(PitchIds.B), getPitch(PitchIds.C)],
    [getPitch(PitchIds.D), getPitch(PitchIds.E), getPitch(PitchIds.F)],
  ] as HarpFaceMatrix<Pitch>
  const newPitchMatrix = [
    [undefined, getPitch(PitchIds.B), getPitch(PitchIds.C)],
    [getPitch(PitchIds.D), getPitch(PitchIds.E), getPitch(PitchIds.F)],
  ] as HarpFaceMatrix<Pitch>
  const global = {
    activePitchMatrix: originalPitchMatrix,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch

  const actualResult = reduceForActivePitchMatrix(
    global,
    unusedDispatcher,
    newPitchMatrix
  )
  const expectedResult = { activePitchMatrix: newPitchMatrix }
  expect(actualResult).toStrictEqual(expectedResult)
  expect(
    Object.is(actualResult.activePitchMatrix, originalPitchMatrix)
  ).toBeFalsy()
  expect(Object.is(actualResult.activePitchMatrix, newPitchMatrix)).toBeTruthy()
})
