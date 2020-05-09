import { EXAMPLE_DEGREE_MATRICES } from '../testResources'
import { FOURTH } from '../constants'
import { ApparatusIds, getApparatus } from '../../Apparatus'

import { getDegreeMatrix } from './index'

const MAJOR_DIATONIC_APPARATUS = getApparatus(ApparatusIds.MajorDiatonic)

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
