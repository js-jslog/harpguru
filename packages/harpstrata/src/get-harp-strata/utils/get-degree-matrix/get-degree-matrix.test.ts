import {
  TuningIds,
  buildApparatus,
  getDegree,
  DegreeIds,
  ValvingIds,
} from 'harpparts'

import { EXAMPLE_DEGREE_MATRICES } from '../../testResources'

import { getDegreeMatrix } from './index'

const fourth = getDegree(DegreeIds.Fourth)
const third = getDegree(DegreeIds.Third)
const seventh = getDegree(DegreeIds.Seventh)

const majorDiatonicApparatus = buildApparatus(
  TuningIds.MajorDiatonic,
  ValvingIds.NotValved
)

test('getDegreeMatrix function maps a simple 2d array of 0s to 4th degrees (6) when halfsetp offset is 7', () => {
  const expectedArray = [[fourth], [fourth]]
  const actualArray = getDegreeMatrix([[0], [0]], 7)

  expect(actualArray).toStrictEqual(expectedArray)
})

test('getDegreeMatrix maps a major diatonic halfstepmatrix in to a major diatonic degreematrix in first pozition', () => {
  const {
    majorDiatonic: {
      firstPozition: {
        notValved: {
          degreeMatrix: { harpface1: expectedDegreeMatrix },
        },
      },
    },
  } = EXAMPLE_DEGREE_MATRICES
  const actualArray = getDegreeMatrix(
    majorDiatonicApparatus.halfstepIndexMatrix.harpface1,
    0
  )

  expect(actualArray).toStrictEqual(expectedDegreeMatrix)
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
