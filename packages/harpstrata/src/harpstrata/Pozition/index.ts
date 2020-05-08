import type { PozitionIds, Pozition } from './types'
import { FIRST, SECOND } from './constants'

const pozitionMap = new Map()
pozitionMap.set(FIRST.id, FIRST)
pozitionMap.set(SECOND.id, SECOND)

export const getActivePozitionIds = (): PozitionIds[] => Array.from(pozitionMap.keys())
export const getPozition = (pozitionId: PozitionIds): Pozition => pozitionMap.get(pozitionId)
export type { PozitionIds } from './types'
