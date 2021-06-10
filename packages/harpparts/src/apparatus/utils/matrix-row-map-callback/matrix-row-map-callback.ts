import type { Hole, MatrixSpecs } from '../../types'

export const matrixRowMapCallback = (
  { blowRow }: MatrixSpecs,
  currentRow: number,
  hole: Hole
): number => {
  const drawRow = blowRow + 1
  const { bends, blowbends, overblows, overdraws } = hole
  if (currentRow === blowRow) return hole.blow
  if (currentRow === drawRow) return hole.draw
  if (currentRow < blowRow)
    return blowbends[currentRow] || overblows[blowRow - currentRow - 1]
  return (
    bends.slice().reverse()[currentRow - drawRow - 1] ||
    overdraws[currentRow - drawRow - 1]
  )
}
