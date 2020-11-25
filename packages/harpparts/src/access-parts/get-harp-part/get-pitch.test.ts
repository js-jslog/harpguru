import { PitchIds } from '../../pitch'

import { getPitch } from './get-pitch'

test('getPitch returns a pitch object', () => {
  const pitch = getPitch(PitchIds.Ab)
  expect(pitch.id).toBe(PitchIds.Ab)
})
