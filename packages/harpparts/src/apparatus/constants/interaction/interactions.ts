import { InteractionIds } from '../../types'
import type { Interaction } from '../../types'

export const BLOW: Interaction = { id: InteractionIds.Blow } as const
export const DRAW: Interaction = { id: InteractionIds.Draw } as const
export const BEND1: Interaction = { id: InteractionIds.Bend1 } as const
export const BEND2: Interaction = { id: InteractionIds.Bend2 } as const
export const BEND3: Interaction = { id: InteractionIds.Bend3 } as const
export const BLOWBEND1: Interaction = { id: InteractionIds.BlowBend1 } as const
export const BLOWBEND2: Interaction = { id: InteractionIds.BlowBend2 } as const
export const OVERDRAW1: Interaction = { id: InteractionIds.OverDraw1 } as const
export const OVERBLOW1: Interaction = { id: InteractionIds.OverBlow1 } as const
