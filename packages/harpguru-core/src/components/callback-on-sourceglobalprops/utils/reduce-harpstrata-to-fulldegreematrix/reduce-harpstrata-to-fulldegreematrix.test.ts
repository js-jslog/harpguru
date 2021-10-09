import { DegreeIds, getDegree } from 'harpparts'

import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToFullDegreeMatrix } from './reduce-harpstrata-to-fulldegreematrix'

test('the previous fullDegreeMatrix object is returned if it matches the one on the harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  const { degreeMatrix } = harpStrata
  const prevDegreeMatrix = [...degreeMatrix]
  const nextDegreeMatrix = reduceHarpStrataToFullDegreeMatrix(
    prevDegreeMatrix,
    harpStrata
  )

  expect(nextDegreeMatrix).toBe(prevDegreeMatrix)
  expect(nextDegreeMatrix).not.toBe(harpStrata.degreeMatrix)
  expect(nextDegreeMatrix).toStrictEqual(harpStrata.degreeMatrix)
})

test('the next fullDegreeMatrix object is returned if it is different from the previous', () => {
  const harpStrata = activeCellsHarpStrata
  const { degreeMatrix } = harpStrata
  const [firstRow] = degreeMatrix
  const [, ...firstRowMinusFirstElement] = firstRow
  const firstRowNewFirstElement = [
    getDegree(DegreeIds.Flat7),
    ...firstRowMinusFirstElement,
  ]
  const [, ...minusFirstRow] = degreeMatrix
  const prevDegreeMatrix = [firstRowNewFirstElement, ...minusFirstRow]
  const nextDegreeMatrix = reduceHarpStrataToFullDegreeMatrix(
    prevDegreeMatrix,
    harpStrata
  )

  expect(nextDegreeMatrix).not.toStrictEqual(prevDegreeMatrix)
  expect(nextDegreeMatrix).toBe(harpStrata.degreeMatrix)
})
