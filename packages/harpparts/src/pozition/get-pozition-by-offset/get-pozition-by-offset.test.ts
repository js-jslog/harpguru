import { PozitionIds } from '../types'
import { getPozition } from '../get-pozition'

import { getPozitionByOffset } from './get-pozition-by-offset'

const third = getPozition(PozitionIds.Third)

test('getPozitionByOffset can return a third pozition', () => {
  const actualPozition = getPozitionByOffset(third.rootOffset)

  expect(actualPozition).toStrictEqual(third)
})
