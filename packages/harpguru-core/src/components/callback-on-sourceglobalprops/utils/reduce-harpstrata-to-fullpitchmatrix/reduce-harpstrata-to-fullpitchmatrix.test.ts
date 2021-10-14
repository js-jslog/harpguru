import { PitchIds, getPitch } from 'harpparts'

import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToFullPitchMatrix } from './reduce-harpstrata-to-fullpitchmatrix'

test('the previous fullPitchMatrix object is returned if it matches the one on the harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  const { pitchMatrix } = harpStrata
  const prevPitchMatrix = [...pitchMatrix]
  const nextPitchMatrix = reduceHarpStrataToFullPitchMatrix(
    prevPitchMatrix,
    harpStrata
  )

  expect(nextPitchMatrix).toBe(prevPitchMatrix)
  expect(nextPitchMatrix).not.toBe(harpStrata.pitchMatrix)
  expect(nextPitchMatrix).toStrictEqual(harpStrata.pitchMatrix)
})

test('the next fullPitchMatrix object is returned if it is different from the previous', () => {
  const harpStrata = activeCellsHarpStrata
  const { pitchMatrix } = harpStrata
  const [firstRow] = pitchMatrix
  const [, ...firstRowMinusFirstElement] = firstRow
  const firstRowNewFirstElement = [
    getPitch(PitchIds.Gb),
    ...firstRowMinusFirstElement,
  ]
  const [, ...minusFirstRow] = pitchMatrix
  const prevPitchMatrix = [firstRowNewFirstElement, ...minusFirstRow]
  const nextPitchMatrix = reduceHarpStrataToFullPitchMatrix(
    prevPitchMatrix,
    harpStrata
  )

  expect(nextPitchMatrix).not.toStrictEqual(prevPitchMatrix)
  expect(nextPitchMatrix).toBe(harpStrata.pitchMatrix)
})
