import { PozitionIds } from '../types'
import type { Pozition } from '../types'

export const getPozition = (pozitionId: PozitionIds): Pozition => ({ id: pozitionId })
