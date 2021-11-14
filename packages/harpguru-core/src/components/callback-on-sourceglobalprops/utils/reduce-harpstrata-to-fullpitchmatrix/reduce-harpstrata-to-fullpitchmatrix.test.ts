import { PitchIds, getPitch } from 'harpparts'

import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToFullPitchMatrix } from './reduce-harpstrata-to-fullpitchmatrix'

test('the previous fullPitchMatrix object is returned if it matches the one on the harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  const { pitchMatrix } = harpStrata
  const prevPitchMatrix = { ...pitchMatrix }
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
  const { harpface1: pitchMatrix1 } = pitchMatrix
  const [firstRow] = pitchMatrix1
  const [, ...firstRowMinusFirstElement] = firstRow
  const firstRowNewFirstElement = [
    getPitch(PitchIds.Gb),
    ...firstRowMinusFirstElement,
  ]
  const [, ...minusFirstRow] = pitchMatrix1
  const prevPitchMatrix = {
    ...pitchMatrix,
    harpface1: [firstRowNewFirstElement, ...minusFirstRow],
  }
  const nextPitchMatrix = reduceHarpStrataToFullPitchMatrix(
    prevPitchMatrix,
    harpStrata
  )

  expect(nextPitchMatrix).not.toStrictEqual(prevPitchMatrix)
  expect(nextPitchMatrix).toBe(harpStrata.pitchMatrix)
})

// TODO: Add test for when the the second matrix isn't empty. All the source data has empty second matrices at the moment
// TODO: These things will be less confusing if I were to change the pitchMatrix property on HarpStrata to pitchMatrices but I haven't really settled on this design yet.
