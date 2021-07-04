import { orderedPitches } from '../constants'
import type { PitchIds, Pitch } from '../../pitch'

export const getPitch = (pitchId: PitchIds): Pitch => {
  const pitch = orderedPitches.get(pitchId)
  if (pitch === undefined) throw 'A pitch id for an unlisted pitch was used'
  return pitch
}
