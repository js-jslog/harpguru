import { PitchIds, NoteFoundations } from '../types'
import type { Pitch } from '../types'
import { HarpPartTypes } from '../../types'

import { generatePitch } from './generate-pitch'

test('generatePitch function can return a C pitch', () => {
  const C_PITCH: Pitch = {
    type: HarpPartTypes.Pitch,
    id: PitchIds.C,
    contextualDisplayValues: {
      natural: NoteFoundations.C,
    },
    simpleSplitValue: ['C', ''] as [string, string],
  } as const
  const actualPitch = generatePitch(C_PITCH.id)

  expect(actualPitch).toStrictEqual(C_PITCH)
})

test('generatePitch function can return a Db pitch', () => {
  const DB_PITCH: Pitch = {
    type: HarpPartTypes.Pitch,
    id: PitchIds.Db,
    contextualDisplayValues: {
      flat: NoteFoundations.D,
      sharp: NoteFoundations.C,
    },
    simpleSplitValue: ['D', 'b'] as [string, string],
  } as const
  const actualPitch = generatePitch(DB_PITCH.id)

  expect(actualPitch).toStrictEqual(DB_PITCH)
})
