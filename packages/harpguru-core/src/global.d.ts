import 'reactn'
import type { HarpStrata, ActiveDegreeIds } from 'harpstrata'

import type { CovariantMembers } from './packages/covariance-series'

import type { DisplayModes, ExperienceModes } from './types'

// All of the `dispatch: any` lines in here are
// required because of a typescript complaint
// about circular references on the `useDispatch`
// calls which reference these reducers. I believe
// I have followed the rules perfectly here but I
// cannot figure out why this error occurs and this
// is the best workaround I can figure out for now.

declare module 'reactn/default' {
  export interface Reducers {
    requestNextQuestion: (
      global: State
    ) => Pick<State, 'quizQuestion' | 'activeHarpStrata'>
    revealAnswer: (global: State) => Pick<State, 'activeHarpStrata'>
    updateHarpStrataAndFlushBuffer: (
      global: State
    ) => Pick<State, 'activeHarpStrata' | 'toggleDegreeIdsBuffer'>
  }

  export interface State {
    quizQuestion: DegreeIds | PitchIds
    activeHarpStrata: HarpStrata
    activeExperienceMode: ExperienceModes
    activeDisplayMode: DisplayModes
    lockedCovariant: CovariantMembers
    toggleDegreeIdsBuffer: ActiveDegreeIds
  }
}
