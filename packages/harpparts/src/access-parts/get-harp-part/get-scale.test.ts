import { ScaleIds } from '../../scale'

import { getScale } from './get-scale'

test('getScale returns a scale object', () => {
  const scale = getScale(ScaleIds.MajorTriad)
  expect(scale.id).toBe(ScaleIds.MajorTriad)
})
