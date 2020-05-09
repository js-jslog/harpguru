import type { PozitionIds, Pozition } from './types'
import { FIRST, SECOND, THIRD, FOURTH, FIFTH, SIXTH, SEVENTH, EIGHTH, NINTH, TENTH, ELEVENTH, TWELFTH } from './constants'

const pozitionMap = new Map()
pozitionMap.set(FIRST.id, FIRST)
pozitionMap.set(SECOND.id, SECOND)
pozitionMap.set(THIRD.id, THIRD)
pozitionMap.set(FOURTH.id, FOURTH)
pozitionMap.set(FIFTH.id, FIFTH)
pozitionMap.set(SIXTH.id, SIXTH)
pozitionMap.set(SEVENTH.id, SEVENTH)
pozitionMap.set(EIGHTH.id, EIGHTH)
pozitionMap.set(NINTH.id, NINTH)
pozitionMap.set(TENTH.id, TENTH)
pozitionMap.set(ELEVENTH.id, ELEVENTH)
pozitionMap.set(TWELFTH.id, TWELFTH)

export const getActivePozitionIds = (): PozitionIds[] => Array.from(pozitionMap.keys())
export const getPozition = (pozitionId: PozitionIds): Pozition => pozitionMap.get(pozitionId)

export { PozitionIds } from './types'
export type { Pozition } from './types'
