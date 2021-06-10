import type { Hole, MatrixSpecs } from '../../types'
import { HalfstepIndex } from '../../../types'

export const halfstepIndexRowMapCallback = (
  { blowRow }: MatrixSpecs,
  currentRow: number,
  hole: Hole
): HalfstepIndex | undefined => {
  const drawRow = blowRow + 1
  const { bends, blowbends, overblows, overdraws } = hole
  if (currentRow === blowRow) return hole.blow
  if (currentRow === drawRow) return hole.draw
  if (currentRow < blowRow)
    return (
      [...blowbends].reverse()[blowRow - currentRow - 1] ||
      overblows[blowRow - currentRow - 1] ||
      undefined
    )
  if (currentRow > drawRow)
    return (
      [...bends].reverse()[currentRow - drawRow - 1] ||
      overdraws[currentRow - drawRow - 1] ||
      undefined
    )

  const errorMessage = `
    Current row is somehow not related to blow and draw rows as expected.

    blowRow: ${blowRow}
    drawRow: ${drawRow}
    currentRow: ${currentRow}
  `
  throw new Error(errorMessage)
}
