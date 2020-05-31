import { PozitionIds } from '../types'

import { getPozitionRootOffset } from './index'

test('getPozitionRootOffset returns 0 for first pozition id', () => {
  expect(getPozitionRootOffset(PozitionIds.First)).toBe(0)
})

test('getPozitionRootOffset returns 9 for fourth pozition id', () => {
  expect(getPozitionRootOffset(PozitionIds.Fourth)).toBe(9)
})

test('getPozitionRootOffset returns 5 for twelfth pozition id', () => {
  expect(getPozitionRootOffset(PozitionIds.Twelfth)).toBe(5)
})
