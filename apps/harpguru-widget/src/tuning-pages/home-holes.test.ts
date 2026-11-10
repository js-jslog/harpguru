import { PozitionIds, TuningIds } from 'harpparts'

import { describeHomeHoles, getHomeHoles } from './home-holes'

const { First, Second, Third } = PozitionIds

const describe = (tuningId: TuningIds, pozitionId: PozitionIds): string =>
  describeHomeHoles(getHomeHoles(tuningId, pozitionId))

test('Home holes are read from the reeds', () => {
  expect(describe(TuningIds.MajorDiatonic, First)).toBe('blow 1, 4, 7 and 10')
  expect(describe(TuningIds.MajorDiatonic, Second)).toBe(
    'draw 2, blow 3, 6 and 9'
  )
  expect(describe(TuningIds.MajorDiatonic, Third)).toBe('draw 1, 4 and 8')
  expect(describe(TuningIds.PowerBender, Third)).toBe(
    'draw 1 and 4, blow 5, draw 8'
  )
})

test('A chromatic harp’s home holes leave the slide out', () => {
  expect(describe(TuningIds.TwelveHoleChromatic, First)).toBe(
    'blow 1, 4, 5, 8, 9 and 12'
  )
})

test('A single hole is named alone', () => {
  expect(describeHomeHoles([{ hole: 4, interaction: 'blow' }])).toBe('blow 4')
})
