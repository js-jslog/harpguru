import { PitchIds } from '../types'
import type { Pitch } from '../types'

import { getPitch } from './index'


test('getPitch function can return a first pozition', () => {
  const C_PITCH: Pitch = { id: PitchIds.C } as const
  const actualPitch = getPitch(C_PITCH.id)

  expect(actualPitch).toStrictEqual(C_PITCH)
})
