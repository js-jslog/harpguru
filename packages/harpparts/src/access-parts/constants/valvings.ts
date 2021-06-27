import { ValvingIds } from '../../valving'
import type { Valving } from '../../valving'

export const ORDERED_VALVINGS = new Map<ValvingIds, Valving>()
ORDERED_VALVINGS.set(ValvingIds.NotValved, { id: ValvingIds.NotValved })
ORDERED_VALVINGS.set(ValvingIds.HalfValved, { id: ValvingIds.HalfValved })
