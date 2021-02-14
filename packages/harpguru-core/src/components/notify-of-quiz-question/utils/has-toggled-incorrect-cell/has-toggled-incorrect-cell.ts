import type { DegreeIds, PitchIds, PozitionIds } from 'harpparts'
import { isPitchId } from 'harpparts'

import { getCounterpartDegreeId } from '../get-counterpart-degree-id'

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

  const counterpartDegreeQuizQuestion = getCounterpartDegreeId({
    pitchId: quizQuestion as PitchIds,
    harpKeyId,
    pozitionId,
  })

  return !toggleBuffer.every(
    (degree) => degree === counterpartDegreeQuizQuestion
  )
}
