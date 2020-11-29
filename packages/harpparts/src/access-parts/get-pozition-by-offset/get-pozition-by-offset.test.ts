import { getPozition } from '../index'
import { PozitionIds } from '../../pozition'

import { getPozitionByOffset } from './get-pozition-by-offset'

const first = getPozition(PozitionIds.First)
const third = getPozition(PozitionIds.Third)

test('getPozition function can return a first pozition', () => {
  const actualPozition = getPozition(first.id)

  expect(actualPozition).toStrictEqual(first)
})

test('getPozitionByOffset can return a third pozition', () => {
  const actualPozition = getPozitionByOffset(third.rootOffset)

  expect(actualPozition).toStrictEqual(third)
})
