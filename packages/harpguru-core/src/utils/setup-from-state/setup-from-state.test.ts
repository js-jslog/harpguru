import { readSetupUrl, writeSetupUrl } from 'harpstrata'
import type { Setup } from 'harpstrata'
import {
  DegreeIds,
  PitchIds,
  PozitionIds,
  TuningIds,
  ValvingIds,
} from 'harpparts'

import { DisplayModes, ExperienceModes } from '../../types'

import { getSetupFromState, getStateFromSetup } from './setup-from-state'

const setup: Setup = {
  harpStrataProps: {
    tuningId: TuningIds.MajorDiatonic,
    valvingId: ValvingIds.HalfValved,
    pozitionId: PozitionIds.Third,
    harpKeyId: PitchIds.Bb,
    activeIds: [DegreeIds.Root, DegreeIds.Fourth, DegreeIds.Fifth],
  },
  displayMode: 'pitch',
}

test('A setup put into a store comes back out as the same setup', () => {
  expect(getSetupFromState(getStateFromSetup(setup))).toEqual(setup)
})

test('A store\'s setup survives a link written and read back', () => {
  const shared = getSetupFromState(getStateFromSetup(setup))
  expect(readSetupUrl(writeSetupUrl(shared))).toEqual(setup)
})

test('A setup opened from a link is shown in Explore, in its display mode', () => {
  const state = getStateFromSetup(setup)
  expect(state.activeExperienceMode).toBe(ExperienceModes.Explore)
  expect(state.activeDisplayMode).toBe(DisplayModes.Pitch)
})
