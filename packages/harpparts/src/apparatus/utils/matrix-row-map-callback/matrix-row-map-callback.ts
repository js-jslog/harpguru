import type { Hole, MatrixSpecs } from '../../types'

export const matrixRowMapCallback = (
  { blowRow }: MatrixSpecs,
  currentY: number,
  hole: Hole
): number => {
  if (currentY === blowRow) return hole.blow
  return hole.draw
}
