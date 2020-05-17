import type { HalfstepIndexMatrix } from '../Apparatus'

import type { PitchIds, PitchMatrix, Pitch } from './types'
import { C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B, ORDERED_PITCHES } from './constants'

const pitchMap = new Map()
pitchMap.set(C.id, C)
pitchMap.set(Db.id, Db)
pitchMap.set(D.id, D)
pitchMap.set(Eb.id, Eb)
pitchMap.set(E.id, E)
pitchMap.set(F.id, F)
pitchMap.set(Gb.id, Gb)
pitchMap.set(G.id, G)
pitchMap.set(Ab.id, Ab)
pitchMap.set(A.id, A)
pitchMap.set(Bb.id, Bb)
pitchMap.set(B.id, B)

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

export { EXAMPLE_PITCH_MATRICES } from './testResources'
