import { MAJOR_DIATONIC_APPARATUS } from '../Apparatus/constants'

import { EXAMPLE_DEGREE_MATRICES } from './testResources'

import { getDegreeMatrix } from './index'
import { FOURTH } from './constants'


test('getDegreeMatrix function maps a simple 2d array of 0\'s to 4th degrees (6) when halfsetp offset is 7', () => {
  const expectedArray = [[ FOURTH, ], [ FOURTH, ]]
  const actualArray = getDegreeMatrix([[ 0, ], [ 0, ]], 7)

  expect(actualArray).toStrictEqual(expectedArray)
})

test('getDegreeMatrix maps a major diatonic halfstepmatrix in to a major diatonic degreematrix in first pozition', () => {
  const { MAJOR_DIATONIC_FIRST_POZITION } = EXAMPLE_DEGREE_MATRICES
  const actualArray = getDegreeMatrix(MAJOR_DIATONIC_APPARATUS.halfstepIndexMatrix, 0)

  expect(actualArray).toStrictEqual(MAJOR_DIATONIC_FIRST_POZITION)
})
