//import { getHarpStrata } from 'harpstrata'
//import { TuningIds, PitchIds, PozitionIds, ValvingIds } from 'harpparts'
//
//import type { GlobalState } from '../../../../types'

//import { getNewColumnBoundsForDispatcher } from './get-new-column-bounds-for-dispatcher'

// TODO: Writing this file has made me realise 2 things:
//
// 1. columnBounds should perhaps be called holeBounds
// 2. there is more functionality here than we need in this dispatcher. The UI should make sure that there are no 7 hole zoom requests to a harp which has less than 7 holes. However this functionality will be important for the callback which runs when the activeHarpStrata is updated to update the columnBounds. I might just house all that functionality under this one function for now in anticipation of trying to have a single function to handle all the situations. I don't know

test('keep me', () => {
  expect(1).toBe(1)
})

//test('when fit zoom level is selected the columnBounds is set to FIT', () => {
//})
//
//test('when 7 hole zoom is selected and columnBounds is already 7 holes wide, the original columnBounds is returned', () => {
//})
//
//test('when 7 hole zoom is selected from existing FIT columnBounds, 0 index is used as the start column', () => {
//})
//
//test('when 7 hole zoom is selected on activeHarpStrata which is less than 7 holes wide, the columnBounds are set to 7 wide with 0 as the start column', () => {
//})
//
//test('when 7 hole zoom is selected and existing start hole is less than 7 holes from the end of the active harp, the start column')

//const baseHarpStrataProps = {
//  tuningId: TuningIds.MajorDiatonic,
//  valvingId: ValvingIds.NotValved,
//  pozitionId: PozitionIds.First,
//  harpKeyId: PitchIds.C,
//  activeIds: [],
//}
//const unvalvedHarpProps = baseHarpStrataProps
//const valvedHarpProps = {
//  ...baseHarpStrataProps,
//  valvingId: ValvingIds.HalfValved,
//}
//
//const unvalvedHarp = getHarpStrata(unvalvedHarpProps)
//const valvedHarp = getHarpStrata(valvedHarpProps)
//
//test('provides HarpStrata updated to exclude valving', () => {
//  const inputGlobal = {
//    activeHarpStrata: valvedHarp,
//  } as GlobalState
//  const unusedDispatcher = jest.fn()
//
//  const {
//    activeHarpStrata: newActiveHarpStrata,
//  } = getNewHarpStrataByValvingForDispatcher(
//    inputGlobal,
//    unusedDispatcher,
//    ValvingIds.NotValved
//  )
//
//  expect(newActiveHarpStrata).toStrictEqual(unvalvedHarp)
//})
//
//test('provides HarpStrata updated to include valving', () => {
//  const inputGlobal = {
//    activeHarpStrata: unvalvedHarp,
//  } as GlobalState
//  const unusedDispatcher = jest.fn()
//
//  const {
//    activeHarpStrata: newActiveHarpStrata,
//  } = getNewHarpStrataByValvingForDispatcher(
//    inputGlobal,
//    unusedDispatcher,
//    ValvingIds.HalfValved
//  )
//
//  expect(newActiveHarpStrata).toStrictEqual(valvedHarp)
//})
