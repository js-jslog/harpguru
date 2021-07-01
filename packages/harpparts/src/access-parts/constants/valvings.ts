import { ValvingIds } from '../../valving'
import type { Valving } from '../../valving'

export const orderedValvings = new Map<ValvingIds, Valving>()
orderedValvings.set(ValvingIds.NotValved, { id: ValvingIds.NotValved })
orderedValvings.set(ValvingIds.HalfValved, { id: ValvingIds.HalfValved })
