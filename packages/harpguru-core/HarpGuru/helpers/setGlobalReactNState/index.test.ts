import { State } from 'reactn/default'
import { setGlobal } from 'reactn'
import {
  getApparatusIds,
  getPozitionIds,
  getPitchIds,
  ActiveIds,
  PitchIds,
  HarpStrataProps,
  HarpStrata,
  getHarpStrata,
} from 'harpstrata'
import { act } from '@testing-library/react-native'

import { espyGlobalTuple } from './stateInformant'

import { setGlobalReactNState } from './index'

const [initialApparatusId] = getApparatusIds()
const [initialPozitionId] = getPozitionIds()
const [initialPitchId] = getPitchIds()
const initialActiveIds: ActiveIds = [PitchIds.A]

const harpStrataProps: HarpStrataProps = {
  apparatusId: initialApparatusId,
  pozitionId: initialPozitionId,
  harpKeyId: initialPitchId,
  activeIds: initialActiveIds,
}
const harpStrata: HarpStrata = getHarpStrata(harpStrataProps)

test('that the global state is defined', () => {
  setGlobalReactNState()
  const { globalTuple } = espyGlobalTuple()
  const [global] = globalTuple
  expect(global.activeHarpStrata.isActiveComplex.activePitchIds.length).toBe(0)
})

test('that the global state is not redefined if it already exists', () => {
  const preexistingState = { activeHarpStrata: harpStrata } as State
  act(() => {
    setGlobal(preexistingState)
  })
  setGlobalReactNState()
  const { globalTuple } = espyGlobalTuple()
  const [global] = globalTuple
  expect(global.activeHarpStrata.isActiveComplex.activePitchIds.length).toBe(1)
})
