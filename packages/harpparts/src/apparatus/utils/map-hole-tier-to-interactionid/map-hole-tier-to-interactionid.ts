import type { Hole, MatrixSpecs } from '../../types'
import { InteractionIds } from '../../types'

export const mapHoleTierToInteractionid = (
  { blowRow }: MatrixSpecs,
  currentRow: number,
  hole: Hole
): InteractionIds | undefined => {
  const {
    Blow,
    Draw,
    Bend1,
    Bend2,
    Bend3,
    Bend4,
    Bend5,
    BlowBend1,
    BlowBend2,
    BlowBend3,
    BlowBend4,
    BlowBend5,
    OverDraw1,
    OverDraw2,
    OverBlow1,
    OverBlow2,
  } = InteractionIds
  const drawRow = blowRow + 1
  const { bends, blowbends, overblows, overdraws } = hole

  const bendInteractions = [Bend1, Bend2, Bend3, Bend4, Bend5]
  const overblowInteractions = [OverBlow1, OverBlow2]
  const blowbendInteractions = [
    BlowBend1,
    BlowBend2,
    BlowBend3,
    BlowBend4,
    BlowBend5,
  ]
  const overdrawInteractions = [OverDraw1, OverDraw2]

  if (currentRow === blowRow) return Blow
  if (currentRow === drawRow) return Draw
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
