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
} from '../../../interaction'

export const mapHoleTierToInteractionid = (
  { blowRow }: MatrixSpecs,
  hole: Hole,
  currentRow: number
): Interaction | undefined => {
  const drawRow = blowRow + 1
  const { bends, blowbends, overblows, overdraws } = hole

  const bendInteractions = [BEND1, BEND2, BEND3, BEND4, BEND5]
  const overblowInteractions = [OVERBLOW1, OVERBLOW2]
  const blowbendInteractions = [
    BLOWBEND1,
    BLOWBEND2,
    BLOWBEND3,
    BLOWBEND4,
    BLOWBEND5,
  ]
  const overdrawInteractions = [OVERDRAW1, OVERDRAW2]

  if (currentRow === blowRow) return BLOW
  if (currentRow === drawRow) return DRAW
  if (currentRow < blowRow) {
    const distance = blowRow - currentRow - 1
    if ([...blowbends].reverse()[distance])
      return blowbendInteractions[distance]
    if (overblows[blowRow - currentRow - 1])
      return overblowInteractions[distance]
    return undefined
  }
  if (currentRow > drawRow) {
    const distance = currentRow - drawRow - 1
    if ([...bends].reverse()[distance]) return bendInteractions[distance]
    if (overdraws[distance]) return overdrawInteractions[distance]
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
