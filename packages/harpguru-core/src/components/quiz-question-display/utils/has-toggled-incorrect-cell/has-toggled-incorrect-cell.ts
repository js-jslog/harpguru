import { getHarpStrata } from 'harpstrata'
import type { DegreeIds, PitchIds, PozitionIds } from 'harpparts'
import { isPitchId, getApparatusIds } from 'harpparts'

type ForDegreeQuestion = {
  readonly toggleBuffer: ReadonlyArray<DegreeIds>
  readonly quizQuestion: DegreeIds
}

type ForPitchQuestion = {
  readonly toggleBuffer: ReadonlyArray<DegreeIds>
  readonly quizQuestion: PitchIds
  readonly harpKeyId: PitchIds
  readonly pozitionId: PozitionIds
}

const isAPitchQuestion = (
  props: ForDegreeQuestion | ForPitchQuestion
): props is ForPitchQuestion => {
  const { quizQuestion } = props
  return isPitchId(quizQuestion)
}

export const hasToggledIncorrectCell = (
  props: ForDegreeQuestion | ForPitchQuestion
): boolean => {
  const { toggleBuffer, quizQuestion } = props
  if (!isAPitchQuestion(props))
    return !toggleBuffer.every((degree) => degree === quizQuestion)

  const { pozitionId, harpKeyId } = props
  const surrogateHarpStrata = getHarpStrata({
    apparatusId: getApparatusIds()[0],
    pozitionId,
    harpKeyId,
    activeIds: [quizQuestion] as ReadonlyArray<PitchIds>,
  })

  const {
    activeDegreeIds: { [0]: counterpartDegreeQuizQuestion },
  } = surrogateHarpStrata

  return !toggleBuffer.every(
    (degree) => degree === counterpartDegreeQuizQuestion
  )
}
