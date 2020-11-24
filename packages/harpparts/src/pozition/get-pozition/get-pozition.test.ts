import { PozitionIds } from '../types'

import { getPozition } from './get-pozition'

const first = getPozition(PozitionIds.First)

test('getPozition function can return a first pozition', () => {
  const actualPozition = getPozition(first.id)

  expect(actualPozition).toStrictEqual(first)
})
