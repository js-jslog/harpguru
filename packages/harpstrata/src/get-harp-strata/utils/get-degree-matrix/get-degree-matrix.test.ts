import { TuningIds, buildApparatus, getDegree, DegreeIds } from 'harpparts'

import { EXAMPLE_DEGREE_MATRICES } from '../../testResources'

import { getDegreeMatrix } from './index'

const fourth = getDegree(DegreeIds.Fourth)
const third = getDegree(DegreeIds.Third)
const seventh = getDegree(DegreeIds.Seventh)

const majorDiatonicApparatus = buildApparatus(TuningIds.MajorDiatonic)

test('getDegreeMatrix function maps a simple 2d array of 0s to 4th degrees (6) when halfsetp offset is 7', () => {
  const expectedArray = [[fourth], [fourth]]
  const actualArray = getDegreeMatrix([[0], [0]], 7)

  expect(actualArray).toStrictEqual(expectedArray)
})

test('getDegreeMatrix maps a major diatonic halfstepmatrix in to a major diatonic degreematrix in first pozition', () => {
  const { MAJOR_DIATONIC_FIRST_POZITION } = EXAMPLE_DEGREE_MATRICES
  const actualArray = getDegreeMatrix(
    majorDiatonicApparatus.halfstepIndexMatrix,
    0
  )

  expect(actualArray).toStrictEqual(MAJOR_DIATONIC_FIRST_POZITION)
})

test('getDegreeMatrix function maps a simple 2d array of -1s to 7th degrees (11) when halfsetp offset is 0', () => {
  const expectedArray = [[seventh], [seventh]]
  const actualArray = getDegreeMatrix([[-1], [-1]], 0)

  expect(actualArray).toStrictEqual(expectedArray)
})

test('getDegreeMatrix function maps a simple 2d array of -13s to 3rd degrees (4) when halfsetp offset is 7', () => {
  const expectedArray = [[third], [third]]
  const actualArray = getDegreeMatrix([[-13], [-13]], 7)

  expect(actualArray).toStrictEqual(expectedArray)
})
