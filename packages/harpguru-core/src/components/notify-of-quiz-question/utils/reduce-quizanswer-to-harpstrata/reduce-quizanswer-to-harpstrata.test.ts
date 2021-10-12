import { DegreeIds, PitchIds } from 'harpparts'

import { inactiveCellsHarpStrata } from '../../../../test-resources'

import { reduceQuizAnswerToHarpStrata } from './reduce-quizanswer-to-harpstrata'

test('when no toggles are buffered a new harpstrata is returned with just the quiz answer added to it', () => {
  const activeHarpStrata = inactiveCellsHarpStrata
  const { Root: degreeQuizQuestion } = DegreeIds
  const { rootPitchId: pitchQuizQuestion } = activeHarpStrata
  const bufferedActivityToggles = [] as ReadonlyArray<DegreeIds>
  const expectedNewHarpStrata = {
    ...activeHarpStrata,
    activeDegreeIds: [degreeQuizQuestion],
    activePitchIds: [pitchQuizQuestion],
  }
  expect(
    reduceQuizAnswerToHarpStrata(
      activeHarpStrata,
      degreeQuizQuestion,
      bufferedActivityToggles
    )
  ).toStrictEqual(expectedNewHarpStrata)
  expect(
    reduceQuizAnswerToHarpStrata(
      activeHarpStrata,
      pitchQuizQuestion,
      bufferedActivityToggles
    )
  ).toStrictEqual(expectedNewHarpStrata)
})

test('when some toggles are buffered a new harpstrata is returned with those toggles and the answer added to it', () => {
  const activeHarpStrata = inactiveCellsHarpStrata
  const { Root: degreeQuizQuestion } = DegreeIds
  const { rootPitchId: pitchQuizQuestion } = activeHarpStrata
  const bufferedActivityToggles = [DegreeIds.Second] as ReadonlyArray<DegreeIds>
  const expectedNewHarpStrata = {
    ...activeHarpStrata,
    activeDegreeIds: [degreeQuizQuestion, DegreeIds.Second],
    activePitchIds: [PitchIds.A, pitchQuizQuestion],
  }
  expect(
    reduceQuizAnswerToHarpStrata(
      activeHarpStrata,
      degreeQuizQuestion,
      bufferedActivityToggles
    )
  ).toStrictEqual(expectedNewHarpStrata)
  expect(
    reduceQuizAnswerToHarpStrata(
      activeHarpStrata,
      pitchQuizQuestion,
      bufferedActivityToggles
    )
  ).toStrictEqual(expectedNewHarpStrata)
})
