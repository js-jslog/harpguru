import type { Hole, MatrixSpecs } from '../../types'
import type { Interaction } from '../../../interaction'
import {
  BLOW,
  DRAW,
  BEND1,
  BEND2,
  BEND3,
  BEND4,
  BEND5,
  BLOWBEND1,
  BLOWBEND2,
  BLOWBEND3,
  BLOWBEND4,
  BLOWBEND5,
  OVERDRAW1,
  OVERDRAW2,
  OVERBLOW1,
  OVERBLOW2,
  VALVEDBLOW1,
  VALVEDDRAW1,
} from '../../../interaction'

export const mapHoleTierToInteractionid = (
  { blowRow }: MatrixSpecs,
  currentRow: number,
  hole: Hole
): Interaction | undefined => {
  const drawRow = blowRow + 1
  const {
    blowbends,
    drawbends,
    overblows,
    overdraws,
    valvedblows,
    valveddraws,
  } = hole

  const overblowInteractions = [OVERBLOW1, OVERBLOW2]
  const valvedBlowInteractions = [VALVEDBLOW1]
  const blowbendInteractions = [
    BLOWBEND1,
    BLOWBEND2,
    BLOWBEND3,
    BLOWBEND4,
    BLOWBEND5,
  ]
  const drawbendInteractions = [BEND1, BEND2, BEND3, BEND4, BEND5]
  const overdrawInteractions = [OVERDRAW1, OVERDRAW2]
  const valvedDrawInteractions = [VALVEDDRAW1]

  if (currentRow === blowRow) return BLOW
  if (currentRow === drawRow) return DRAW
  if (currentRow < blowRow) {
    const distance = blowRow - currentRow - 1
    if ([...blowbends].reverse()[distance])
      return blowbendInteractions[distance]
    if (overblows[distance]) return overblowInteractions[distance]
    if ([...valvedblows].reverse()[distance])
      return valvedBlowInteractions[distance]
    return undefined
  }
  if (currentRow > drawRow) {
    const distance = currentRow - drawRow - 1
    if ([...drawbends].reverse()[distance])
      return drawbendInteractions[distance]
    if (overdraws[distance]) return overdrawInteractions[distance]
    if ([...valveddraws].reverse()[distance])
      return valvedDrawInteractions[distance]
    return undefined
  }

  const errorMessage = `
    Current row is somehow not related to blow and draw rows as expected.

    blowRow: ${blowRow}
    drawRow: ${drawRow}
    currentRow: ${currentRow}
  `
  throw new Error(errorMessage)
}
