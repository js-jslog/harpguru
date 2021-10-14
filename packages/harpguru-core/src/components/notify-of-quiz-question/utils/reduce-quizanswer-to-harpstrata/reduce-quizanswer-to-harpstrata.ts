import type { HarpStrata } from 'harpstrata'
import { getHarpStrata } from 'harpstrata'
import type { DegreeIds, PitchIds } from 'harpparts'
import { isPitchId } from 'harpparts'

import { getCounterpartDegreeId } from '../get-counterpart-degree-id'

export const reduceQuizAnswerToHarpStrata = (
  activeHarpStrata: HarpStrata,
  quizQuestion: DegreeIds | PitchIds,
  bufferedActivityToggles: ReadonlyArray<DegreeIds>
): HarpStrata => {
  const {
    apparatus: { tuningId, valvingId },
    harpKeyId,
    pozitionId,
  } = activeHarpStrata
  const answerDegreeIds = (() => {
    if (isPitchId(quizQuestion)) {
      const counterpartDegreeId = getCounterpartDegreeId({
        pitchId: quizQuestion,
        harpKeyId: harpKeyId,
        pozitionId: pozitionId,
      })
      const answerDegreeIds = [...bufferedActivityToggles, counterpartDegreeId]
      return answerDegreeIds
    }
    const answerDegreeIds = [...bufferedActivityToggles, quizQuestion]
    return answerDegreeIds
  })()
  const harpStrataProps = {
    tuningId,
    valvingId,
    harpKeyId,
    pozitionId,
    activeIds: answerDegreeIds,
  }
  const answerHarpStrata = getHarpStrata(harpStrataProps)
  return answerHarpStrata
}
