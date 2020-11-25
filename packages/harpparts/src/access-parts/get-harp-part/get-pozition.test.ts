import { PozitionIds } from '../../pozition'

import { getPozition } from './get-pozition'

test('getPozition returns a pozition object', () => {
  const pozition = getPozition(PozitionIds.First)
  expect(pozition).toBeTruthy()
})
