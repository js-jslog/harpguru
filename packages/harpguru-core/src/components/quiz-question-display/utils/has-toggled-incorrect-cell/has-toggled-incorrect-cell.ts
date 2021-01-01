import type { DegreeIds } from 'harpparts'

export const hasToggledIncorrectCell = (
  toggleBuffer: ReadonlyArray<DegreeIds>,
  quizQuestion: DegreeIds
): boolean => {
  return !toggleBuffer.every((degree) => degree === quizQuestion)
}
