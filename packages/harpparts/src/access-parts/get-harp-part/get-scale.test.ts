import { getScaleIds } from '../get-ordered-part-ids'
import { ScaleIds } from '../../scale'

import { getScale } from './get-scale'

test('getScale returns a scale object', () => {
  const scale = getScale(ScaleIds.MajorTriad)
  expect(scale.id).toBe(ScaleIds.MajorTriad)
})

test('All the scale ids available have a counterpart object to recover', () => {
  getScaleIds().forEach((scaleId) =>
    expect(() => getScale(scaleId)).not.toThrow()
  )
})
