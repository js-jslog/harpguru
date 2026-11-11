import { PitchIds, PozitionIds, TuningIds, ValvingIds } from 'harpparts'

import { describeHarp } from './describe-setup'

const harpStrataProps = {
  tuningId: TuningIds.PaddyRichter,
  valvingId: ValvingIds.NotValved,
  pozitionId: PozitionIds.Third,
  harpKeyId: PitchIds.Bb,
  activeIds: [],
}

test('A setup is described in the app menus\' words', () => {
  expect(describeHarp(harpStrataProps)).toBe(
    'Paddy richter · Harp key Bb · 3rd position · Song key C'
  )
  expect(describeHarp(harpStrataProps, { withTuning: false })).toBe(
    'Harp key Bb · 3rd position · Song key C'
  )
})

test('A half valved harp says so after its tuning', () => {
  expect(
    describeHarp({ ...harpStrataProps, valvingId: ValvingIds.HalfValved })
  ).toBe('Paddy richter · Half valved · Harp key Bb · 3rd position · Song key C')
})
