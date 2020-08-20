import { PitchIds, NoteFoundations } from '../types'
import type { Pitch } from '../types'

import { getPitch } from './index'


test('getPitch function can return a C pitch', () => {
  const C_PITCH: Pitch = {
    id: PitchIds.C,
    contextualDisplayValues: {
      natural: NoteFoundations.C
    }
  } as const
  const actualPitch = getPitch(C_PITCH.id)

  expect(actualPitch).toStrictEqual(C_PITCH)
})

test('getPitch function can return a Db pitch', () => {
  const DB_PITCH: Pitch = {
    id: PitchIds.Db,
    contextualDisplayValues: {
      flat: NoteFoundations.D,
      sharp: NoteFoundations.C
    }
  } as const
  const actualPitch = getPitch(DB_PITCH.id)

  expect(actualPitch).toStrictEqual(DB_PITCH)
})
