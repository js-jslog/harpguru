import { PitchIds } from '../types'
import type { Pitch } from '../types'

export const getPitch = (pitchId: PitchIds): Pitch => ({ id: pitchId })
