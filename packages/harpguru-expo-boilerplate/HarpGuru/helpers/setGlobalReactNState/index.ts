import { setGlobal } from 'reactn'
import {
  getHarpStrata,
  getApparatusIds,
  getPozitionIds,
  getPitchIds,
  PitchIds,
} from 'harpstrata'
import type { ActiveIds, HarpStrataProps, HarpStrata } from 'harpstrata'

export enum ExperienceModes {
  Explore = 'EXPLORE',
  Quiz = 'QUIZ',
}

import { getNextQuizQuestion } from '../getNextQuizQuestion'
import { DisplayModes } from '../../types'

import { espyGlobalTuple } from './stateInformant'

export const setGlobalReactNState = (): void => {
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
  const { Explore: explore } = ExperienceModes

  const { globalTuple } = espyGlobalTuple()
  if (globalTuple[0].activeHarpStrata !== undefined) return

  const state = {
    activeHarpStrata: initialHarpStrata,
    quizQuestion: getNextQuizQuestion(PitchIds.A, DisplayModes.Pitch),
    activeExperienceMode: explore,
  }
  setGlobal(state)
}

export type SetActiveHarpStrata = (arg0: HarpStrata) => void
