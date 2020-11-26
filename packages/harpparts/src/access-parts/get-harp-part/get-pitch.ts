import { ORDERED_PITCHES } from '../constants'
import type { PitchIds, Pitch } from '../../pitch'

export const getPitch = (pitchId: PitchIds): Pitch => {
  const pitch = ORDERED_PITCHES.get(pitchId)
  if (pitch === undefined) throw 'A pitch id for an unlisted pitch was used'
  return pitch
}
