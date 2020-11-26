import { State } from 'reactn/default'
import { setGlobal } from 'reactn'
import {
  getApparatusIds,
  getPitchIds,
  ActiveIds,
  PitchIds,
  HarpStrataProps,
  HarpStrata,
  getHarpStrata,
} from 'harpstrata'
import { getPozitionIds } from 'harpparts'
import { act } from '@testing-library/react-native'

import { espyGlobalTuple } from './state-informant'
import { setGlobalState } from './set-global-state'

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
  setGlobalState()
  const { globalTuple } = espyGlobalTuple()
  const [global] = globalTuple
  expect(global.activeHarpStrata.activePitchIds.length).toBe(0)
})

test('that the global state is not redefined if it already exists', () => {
  const preexistingState = { activeHarpStrata: harpStrata } as State
  act(() => {
    setGlobal(preexistingState)
  })
  setGlobalState()
  const { globalTuple } = espyGlobalTuple()
  const [global] = globalTuple
  expect(global.activeHarpStrata.activePitchIds.length).toBe(1)
})
