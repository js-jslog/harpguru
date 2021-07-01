import { getPozitionIds } from '../get-ordered-part-ids'
import { PozitionIds } from '../../pozition'

import { getPozition } from './get-pozition'

test('getPozition returns a pozition object', () => {
  const pozition = getPozition(PozitionIds.First)
  expect(pozition.id).toBe(PozitionIds.First)
})

test('All the pozition ids available have a counterpart object to recover', () => {
  getPozitionIds().forEach((pozitionId) =>
    expect(() => getPozition(pozitionId)).not.toThrow()
  )
})
