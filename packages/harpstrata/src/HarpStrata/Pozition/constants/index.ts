import { PozitionIds } from '../types'
import type { Pozition } from '../types'

export const FIRST: Pozition = {
  id: PozitionIds.First,
  root: 0,
} as const

export const SECOND: Pozition = {
  id: PozitionIds.Second,
  root: 7,
} as const
