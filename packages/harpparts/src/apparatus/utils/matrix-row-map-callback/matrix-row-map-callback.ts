import type { Hole, MatrixSpecs } from '../../types'

export const matrixRowMapCallback = (
  { blowRow }: MatrixSpecs,
  currentRow: number,
  hole: Hole
): number => {
  const drawRow = blowRow + 1
  if (currentRow === blowRow) return hole.blow
  if (currentRow === drawRow) return hole.draw
  if (currentRow < blowRow)
    return hole.blowbends[0] || hole.overblows[blowRow - currentRow - 1]
  return hole.bends[currentRow - drawRow - 1] || hole.overdraws[0]
}
