import { TuningIds } from '../../tuning'

import { getTuning } from './get-tuning'

test('getTuning returns a tuning object', () => {
  const tuning = getTuning(TuningIds.MajorDiatonic)
  expect(tuning.id).toBe(TuningIds.MajorDiatonic)
})
