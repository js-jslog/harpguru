import type { Dispatch } from 'reactn/default'
import { getDegree, DegreeIds, HarpFaceMatrix } from 'harpparts'
import type { Degree } from 'harpparts'

import type { GlobalState } from '../../types'

import { reduceForActiveDegreeMatrix } from './reduce-for-active-degree-matrix'

test('the original degreeMatrix gets returned from the reducer when new matches old', () => {
  const originalDegreeMatrix = [
    [
      getDegree(DegreeIds.Root),
      getDegree(DegreeIds.Second),
      getDegree(DegreeIds.Third),
    ],
    [
      getDegree(DegreeIds.Fourth),
      getDegree(DegreeIds.Fifth),
      getDegree(DegreeIds.Sixth),
    ],
  ] as HarpFaceMatrix<Degree>
  const newDegreeMatrix = [
    [
      getDegree(DegreeIds.Root),
      getDegree(DegreeIds.Second),
      getDegree(DegreeIds.Third),
    ],
    [
      getDegree(DegreeIds.Fourth),
      getDegree(DegreeIds.Fifth),
      getDegree(DegreeIds.Sixth),
    ],
  ] as HarpFaceMatrix<Degree>
  const global = {
    activeDegreeMatrix: originalDegreeMatrix,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch

  const actualResult = reduceForActiveDegreeMatrix(
    global,
    unusedDispatcher,
    newDegreeMatrix
  )
  const expectedResult = { activeDegreeMatrix: originalDegreeMatrix }
  expect(actualResult).toStrictEqual(expectedResult)
  expect(
    Object.is(actualResult.activeDegreeMatrix, originalDegreeMatrix)
  ).toBeTruthy()
  expect(
    Object.is(actualResult.activeDegreeMatrix, newDegreeMatrix)
  ).toBeFalsy()
})

test('a new degreeMatrix gets returned from the reducer', () => {
  const originalDegreeMatrix = [
    [
      getDegree(DegreeIds.Root),
      getDegree(DegreeIds.Second),
      getDegree(DegreeIds.Third),
    ],
    [
      getDegree(DegreeIds.Fourth),
      getDegree(DegreeIds.Fifth),
      getDegree(DegreeIds.Sixth),
    ],
  ] as HarpFaceMatrix<Degree>
  const newDegreeMatrix = [
    [undefined, getDegree(DegreeIds.Second), getDegree(DegreeIds.Third)],
    [
      getDegree(DegreeIds.Fourth),
      getDegree(DegreeIds.Fifth),
      getDegree(DegreeIds.Sixth),
    ],
  ] as HarpFaceMatrix<Degree>
  const global = {
    activeDegreeMatrix: originalDegreeMatrix,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch

  const actualResult = reduceForActiveDegreeMatrix(
    global,
    unusedDispatcher,
    newDegreeMatrix
  )
  const expectedResult = { activeDegreeMatrix: newDegreeMatrix }
  expect(actualResult).toStrictEqual(expectedResult)
  expect(
    Object.is(actualResult.activeDegreeMatrix, originalDegreeMatrix)
  ).toBeFalsy()
  expect(
    Object.is(actualResult.activeDegreeMatrix, newDegreeMatrix)
  ).toBeTruthy()
})
