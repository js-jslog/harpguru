import { getPitchIds } from '../get-ordered-part-ids'
import { PitchIds } from '../../pitch'

import { getPitch } from './get-pitch'

test('getPitch returns a pitch object', () => {
  const pitch = getPitch(PitchIds.Ab)
  expect(pitch.id).toBe(PitchIds.Ab)
})

test('All the pitch ids available have a counterpart object to recover', () => {
  getPitchIds().forEach((pitchId) =>
    expect(() => getPitch(pitchId)).not.toThrow()
  )
})
