import type { Pitch } from '../types'
import { PitchIds } from '../types'

export const getAscendingPitchIds = (originId: PitchIds = PitchIds.C): ReadonlyArray<PitchIds> => {
  const ascendingPitchIds = Object.values(PitchIds)

  const originIndex = ascendingPitchIds.indexOf(originId)

  const head = [ ...ascendingPitchIds.slice(originIndex) ]
  const tail = [ ...ascendingPitchIds.slice(0, (originIndex)) ]

  return [ ...head, ...tail ]
}

export const getDescendingPitchIds = (originId: PitchIds = PitchIds.C): ReadonlyArray<PitchIds> => {
  const ascendingPitchIds = getAscendingPitchIds(originId)
  const [ , ...ascendingWithoutOrigin ] = ascendingPitchIds
  const descendingWithoutOrigin = [ ...ascendingWithoutOrigin ].reverse()

  return [ originId, ...descendingWithoutOrigin ]
}

export const getPitch = (pitchId: PitchIds): Pitch => ({ id: pitchId })
