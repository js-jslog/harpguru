import { PozitionIds } from '../types'
import type { Pozition } from '../types'
import { FIRST, SECOND, THIRD, FOURTH, FIFTH, SIXTH, SEVENTH, EIGHTH, NINTH, TENTH, ELEVENTH, TWELFTH } from '../constants'

const pozitionMap = new Map()
pozitionMap.set(FIRST.id, FIRST)
pozitionMap.set(EIGHTH.id, EIGHTH)
pozitionMap.set(THIRD.id, THIRD)
pozitionMap.set(TENTH.id, TENTH)
pozitionMap.set(FIFTH.id, FIFTH)
pozitionMap.set(TWELFTH.id, TWELFTH)
pozitionMap.set(SEVENTH.id, SEVENTH)
pozitionMap.set(SECOND.id, SECOND)
pozitionMap.set(NINTH.id, NINTH)
pozitionMap.set(FOURTH.id, FOURTH)
pozitionMap.set(ELEVENTH.id, ELEVENTH)
pozitionMap.set(SIXTH.id, SIXTH)

export const getAscendingPozitionIds = (originId: PozitionIds = PozitionIds.First): ReadonlyArray<PozitionIds> => {
  const ascendingPozitionIds = Array.from(pozitionMap.keys())

  const originIndex = ascendingPozitionIds.indexOf(originId)

  const head = [ ...ascendingPozitionIds.slice(originIndex) ]
  const tail = [ ...ascendingPozitionIds.slice(0, (originIndex)) ]

  return [ ...head, ...tail ]
}

export const getPozitionRootOffset = (pozitionId: PozitionIds): number => getAscendingPozitionIds().indexOf(pozitionId)

export const getPozition = (pozitionId: PozitionIds): Pozition => pozitionMap.get(pozitionId)
