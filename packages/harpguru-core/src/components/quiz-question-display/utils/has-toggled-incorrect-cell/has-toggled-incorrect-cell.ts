import { getHarpStrata } from 'harpstrata'
import type { DegreeIds, PitchIds, PozitionIds } from 'harpparts'
import { isPitchId, getApparatusIds } from 'harpparts'

export const hasToggledIncorrectCell = (
  toggleBuffer: ReadonlyArray<DegreeIds>,
  quizQuestion: DegreeIds | PitchIds,
  harpKeyId: PitchIds,
  pozitionId: PozitionIds
): boolean => {
  if (!isPitchId(quizQuestion))
    return !toggleBuffer.every((degree) => degree === quizQuestion)

  const surrogateHarpStrata = getHarpStrata({
    apparatusId: getApparatusIds()[0],
    pozitionId,
    harpKeyId,
    activeIds: [quizQuestion],
  })

  const {
    activeDegreeIds: { [0]: counterpartDegreeQuizQuestion },
  } = surrogateHarpStrata

  return !toggleBuffer.every(
    (degree) => degree === counterpartDegreeQuizQuestion
  )
}
