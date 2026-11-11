import { TuningIds } from '../tuning'
import { ScaleIds } from '../scale'
import { getTuningIds, getScaleIds } from '../access-parts'

import {
  getTuningSlug,
  getTuningIdBySlug,
  getScaleSlug,
  getScaleIdBySlug,
} from './slugs'

const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/

test('Every tuning has a distinct slug of lowercase letters, digits and hyphens', () => {
  const slugs = getTuningIds().map(getTuningSlug)

  slugs.forEach((slug) => expect(slug).toMatch(slugPattern))
  expect(new Set(slugs).size).toBe(getTuningIds().length)
})

test('Every scale has a distinct slug of lowercase letters, digits and hyphens', () => {
  const slugs = getScaleIds().map(getScaleSlug)

  slugs.forEach((slug) => expect(slug).toMatch(slugPattern))
  expect(new Set(slugs).size).toBe(getScaleIds().length)
})

test('A slug leads back to its tuning or scale, and an unknown one to nothing', () => {
  getTuningIds().forEach((tuningId) =>
    expect(getTuningIdBySlug(getTuningSlug(tuningId))).toBe(tuningId)
  )
  getScaleIds().forEach((scaleId) =>
    expect(getScaleIdBySlug(getScaleSlug(scaleId))).toBe(scaleId)
  )
  expect(getTuningIdBySlug('not-a-tuning')).toBeUndefined()
  expect(getScaleIdBySlug('not-a-scale')).toBeUndefined()
})

// Shared links and printed QR codes carry these. If this fails, a slug has
// changed or gone, and every link using it has broken: add, never alter.
test('Shipped slugs never change', () => {
  expect(getTuningSlug(TuningIds.MajorDiatonic)).toBe('major-diatonic')
  expect(getTuningSlug(TuningIds.TwelveHoleChromatic)).toBe('chromatic-12-hole')
  expect(getTuningSlug(TuningIds.Circular)).toBe('circular-melody-king')
  expect(getScaleSlug(ScaleIds.Aeolian)).toBe('natural-minor')
  expect(getTuningIds().map(getTuningSlug)).toMatchSnapshot()
  expect(getScaleIds().map(getScaleSlug)).toMatchSnapshot()
})
