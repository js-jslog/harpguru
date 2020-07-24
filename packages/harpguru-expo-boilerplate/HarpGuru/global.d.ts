import 'reactn'
import type { HarpStrata } from 'harpstrata'

import type { ExperienceModes } from './helpers/setGlobalReactNState'

import type { DisplayModes } from './types'

// All of the `dispatch: any` lines in here are
// required because of a typescript complaint
// about circular references on the `useDispatch`
// calls which reference these reducers. I believe
// I have followed the rules perfectly here but I
// cannot figure out why this error occurs and this
// is the best workaround I can figure out for now.

declare module 'reactn/default' {
  export interface Reducers {
    quizAnswerGiven: (
      global: State,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch: any,
      displayMode: DisplayModes
    ) => void
    requestNextQuestion: (
      global: State,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch: any,
      displayMode: DisplayModes
    ) => Pick<State, 'quizQuestion' | 'activeHarpStrata'>
  }

  export interface State {
    quizQuestion: DegreeIds | PitchIds
    activeHarpStrata: HarpStrata
    activeExperienceMode: ExperienceModes
  }
}
