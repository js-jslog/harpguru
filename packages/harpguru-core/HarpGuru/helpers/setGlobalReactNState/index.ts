import { setGlobal } from 'reactn'
import {
  getHarpStrata,
  getApparatusIds,
  getPozitionIds,
  getPitchIds,
} from 'harpstrata'
import type { ActiveIds, HarpStrataProps, HarpStrata } from 'harpstrata'

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

const state = { activeHarpStrata: initialHarpStrata }
setGlobal(state)

export type SetActiveHarpStrata = (arg0: HarpStrata) => void

export const setGlobalReactNState = `
  This variable confirms that the setGlobal function has
  been called with the following initial state.

  No further action is required to load this in to the app.

  ${JSON.stringify(state, undefined, 2)}
`
