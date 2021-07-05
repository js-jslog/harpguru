import { getTuningIds } from '../get-ordered-part-ids'
import { TuningIds } from '../../tuning'

import { getTuning } from './get-tuning'

test('getTuning returns a tuning object', () => {
  const tuning = getTuning(TuningIds.Richter)
  expect(tuning.id).toBe(TuningIds.Richter)
})

test('All the tuning ids available have a counterpart object to recover', () => {
  getTuningIds().forEach((tuningId) =>
    expect(() => getTuning(tuningId)).not.toThrow()
  )
})
