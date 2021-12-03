import { PitchIds, getPitch } from 'harpparts'

import {
  activeCellsHarpStrata,
  chromaticHarpStrata,
} from '../../../../test-resources'

import { reduceHarpStrataToFullPitchMatrix } from './reduce-harpstrata-to-fullpitchmatrix'

test('the previous fullPitchMatrix object is returned if it matches the one on an input diatonic harpstrata', () => {
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

test('the previous fullPitchMatrix object is returned if it matches the one on an input chromatic harpstrata', () => {
  const harpStrata = chromaticHarpStrata
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

test('the next diatonic fullPitchMatrix object is returned if it is different from the previous', () => {
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

test('the next chromatic fullPitchMatrix object is returned if it is different from the previous', () => {
  const harpStrata = chromaticHarpStrata
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
