import type { HalfstepIndexMatrix } from '../Apparatus'

import type { PitchIds, PitchMatrix, Pitch } from './types'
import { C, Db, ORDERED_PITCHES } from './constants'

const pitchMap = new Map()
pitchMap.set(C.id, C)
pitchMap.set(Db.id, Db)

export const getActivePitchIds = (): PitchIds[] => Array.from(pitchMap.keys())
export const getPitch = (pitchId: PitchIds): Pitch => pitchMap.get(pitchId)

export const getPitchMatrix = (halfstepIndexMatrix: HalfstepIndexMatrix, keyPitchId: PitchIds): PitchMatrix => {
  const orderedPitchIds = ORDERED_PITCHES.map(pitch => pitch.id)
  const pitchIndex = orderedPitchIds.indexOf(keyPitchId)
  const arrayHead = [ ...ORDERED_PITCHES.slice(pitchIndex) ]
  const arrayTail = [ ...ORDERED_PITCHES.slice(0, (pitchIndex)) ]
  const alignedPitchIds = [ ...arrayHead, ...arrayTail ]

  return halfstepIndexMatrix.map((halfstepIndexRow) => {
    return halfstepIndexRow.map((halfstepIndex) => {
      if (halfstepIndex === undefined) return undefined
      return alignedPitchIds[halfstepIndex % 12]
    })
  })
}

export type { Pitch, PitchRow, PitchMatrix } from './types'
export { PitchIds } from './types'
export { A, Bb, B, C, Db, D, Eb, E, F, Gb, G, Ab } from './constants'
