import type { HarpFaceMatrix, Pitch } from 'harpparts'

export const compareMatrixContents = (
  matrix1: HarpFaceMatrix<Pitch>,
  matrix2: HarpFaceMatrix<Pitch>
): boolean => {
  return matrix1 === matrix2
}
