import { PozitionIds, TuningIds } from 'harpparts'

import { readTuningQuery, writeTuningQuery } from './tuning-query'

test('A tuning page opens on its first preset, in degrees', () => {
  const view = readTuningQuery(TuningIds.MajorDiatonic, '')

  expect(view.preset.pozitionId).toBe(PozitionIds.Second)
  expect(view.displayMode).toBe('degree')
  expect(writeTuningQuery(view)).toBe('p=2')
})

test('An offered preset and the pitch display are read back', () => {
  const view = readTuningQuery(TuningIds.MajorDiatonic, '?p=3&m=PITCH')

  expect(view.preset.pozitionId).toBe(PozitionIds.Third)
  expect(view.preset.scaleLabel).toBe('Dorian')
  expect(view.displayMode).toBe('pitch')
  expect(writeTuningQuery(view)).toBe('p=3&m=pitch')
})

test('A pozition the page does not offer falls back to the first preset', () => {
  expect(readTuningQuery(TuningIds.MelodyMaker, 'p=1').preset.pozitionId).toBe(
    PozitionIds.Second
  )
  expect(readTuningQuery(TuningIds.MajorDiatonic, 'p=%').preset.pozitionId).toBe(
    PozitionIds.Second
  )
})
