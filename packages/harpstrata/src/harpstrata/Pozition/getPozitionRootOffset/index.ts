import { PozitionIds } from '../../Pozition'
import { getAscendingPozitionIds } from '../../OrderedIds'

export const getPozitionRootOffset = (pozitionId: PozitionIds): number => getAscendingPozitionIds().indexOf(pozitionId)
