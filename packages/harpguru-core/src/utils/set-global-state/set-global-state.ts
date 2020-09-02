import { setGlobal } from 'reactn'
import {
  getHarpStrata,
  getApparatusIds,
  getPozitionIds,
  getPitchIds,
  PitchIds,
} from 'harpstrata'
import type { ActiveIds, HarpStrataProps, HarpStrata } from 'harpstrata'

import { getNextQuizQuestion } from '../get-next-quiz-question'
import { DisplayModes, ExperienceModes } from '../../types'
import { CovariantMembers } from '../../packages/covariance-series'

import { espyGlobalTuple } from './state-informant'

export const setGlobalState = (): void => {
  const { globalTuple } = espyGlobalTuple()
  if (globalTuple[0].activeHarpStrata !== undefined) return

  const [initialApparatusId] = getApparatusIds()
  const [initialPozitionId] = getPozitionIds()
  const [initialPitchId] = getPitchIds()
  const initialActiveIds: ActiveIds = []

  const initialHarpStrataProps: HarpStrataProps = {
    apparatusId: initialApparatusId,
    pozitionId: initialPozitionId,
    harpKeyId: initialPitchId,
    activeIds: initialActiveIds,
  }
  const initialHarpStrata: HarpStrata = getHarpStrata(initialHarpStrataProps)
  const { Explore: initialExperienceMode } = ExperienceModes
  const { Degree: initialDisplayMode } = DisplayModes
  const { Pozition: initialLockedCovariant } = CovariantMembers

  const state = {
    activeHarpStrata: initialHarpStrata,
    quizQuestion: getNextQuizQuestion(PitchIds.A, initialDisplayMode),
    activeExperienceMode: initialExperienceMode,
    activeDisplayMode: initialDisplayMode,
    lockedCovariant: initialLockedCovariant,
  }
  setGlobal(state)
}
