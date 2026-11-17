import { readSetupUrl } from 'harpstrata'
import type { Setup } from 'harpstrata'

import { getSetupSummary } from './get-setup-summary'

const summaryOf = (query: string) =>
  getSetupSummary(readSetupUrl(`https://harpguru.com/s/?${query}`) as Setup)

test('A named scale is summed up by its name, the four facts and the degrees it lights', () => {
  const summary = summaryOf('t=major-diatonic&k=C&p=2&s=blues')
  expect(summary).toMatchObject({
    title: 'Blues scale',
    harpKey: 'C',
    position: '2nd',
    songKey: 'G',
    tuning: 'Major diatonic',
  })
  expect(
    summary.degrees.filter(({ isActive }) => isActive).map(({ label }) => label)
  ).toEqual(['1', '♭3', '4', '♭5', '5', '♭7'])
  expect(summary.degrees.map(({ label }) => label)).toEqual([
    '1', '♭2', '2', '♭3', '3', '4', '♭5', '5', '♭6', '6', '♭7', '7',
  ])
})

test('Flat keys are written with a flat sign', () => {
  expect(summaryOf('k=Bb&p=3&d=1')).toMatchObject({
    harpKey: 'B♭',
    position: '3rd',
    songKey: 'C',
  })
})

test('A selection that is no named scale says so, and so does an empty one', () => {
  expect(summaryOf('d=1,2b,7').title).toBe('Your own selection')
  expect(summaryOf('d=').title).toBe('No notes lit')
})
