import type { Hole, MatrixSpecs } from '../../types'
import { HalfstepIndex } from '../../../types'

export const mapHoleTierToHalfstepindex = (
  { blowRow }: MatrixSpecs,
  currentRow: number,
  hole: Hole
): HalfstepIndex | undefined => {
  const drawRow = blowRow + 1
  const {
    blowbends,
    drawbends,
    overblows,
    overdraws,
    valvedblows,
    valveddraws,
  } = hole
  if (currentRow === blowRow) return hole.blow
  if (currentRow === drawRow) return hole.draw
  if (currentRow < blowRow) {
    const distance = blowRow - currentRow - 1
    return (
      [...blowbends].reverse()[distance] ||
      overblows[distance] ||
      valvedblows.reverse()[distance] ||
      undefined
    )
  }
  if (currentRow > drawRow) {
    const distance = currentRow - drawRow - 1
    return (
      [...drawbends].reverse()[distance] ||
      overdraws[distance] ||
      valveddraws.reverse()[distance] ||
      undefined
    )
  }

  const errorMessage = `
    Current row is somehow not related to blow and draw rows as expected.

    blowRow: ${blowRow}
    drawRow: ${drawRow}
    currentRow: ${currentRow}
  `
  throw new Error(errorMessage)
}
