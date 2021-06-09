import type { Hole, MatrixSpecs } from '../../types'

export const matrixRowMapCallback = (
  { height, blowRow }: MatrixSpecs,
  currentRow: number,
  hole: Hole
): number => {
  const drawRow = blowRow + 1
  if (currentRow === blowRow) return hole.blow
  if (currentRow === drawRow) return hole.draw
  if (currentRow < blowRow)
    return (
      hole.blowbends[currentRow] || hole.overblows[blowRow - currentRow - 1]
    )
  return (
    hole.bends[height - currentRow - 1] ||
    hole.overdraws[currentRow - drawRow - 1]
  )
}
