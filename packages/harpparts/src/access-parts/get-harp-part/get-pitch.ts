import { ORDERED_PITCHES } from '../constants'
import type { PitchIds, Pitch } from '../../pitch'

export const getPitch = (pitchId: PitchIds): Pitch => {
  return ORDERED_PITCHES[pitchId]
}
