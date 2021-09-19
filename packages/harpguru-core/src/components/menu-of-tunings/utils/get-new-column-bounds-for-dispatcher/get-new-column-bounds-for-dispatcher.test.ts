import { getHarpStrata } from 'harpstrata'
import {
  TuningIds,
  PitchIds,
  PozitionIds,
  ValvingIds,
  DegreeIds,
  HarpFaceMatrix,
  Degree,
} from 'harpparts'

import { ZoomIds } from '../../types'
import type { GlobalState } from '../../../../types'

import { getNewColumnBoundsForDispatcher } from './get-new-column-bounds-for-dispatcher'

// TODO: Writing this file has made me realise 2 things:
//
// 1. columnBounds should perhaps be called holeBounds
// 2. there is more functionality here than we need in this dispatcher. The UI should make sure that there are no 7 hole zoom requests to a harp which has less than 7 holes. However this functionality will be important for the callback which runs when the activeHarpStrata is updated to update the columnBounds. I might just house all that functionality under this one function for now in anticipation of trying to have a single function to handle all the situations. I don't know

const baseHarpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  valvingId: ValvingIds.NotValved,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const majorDiatonicHarpProps = baseHarpStrataProps
const majorDiatonicHarp = getHarpStrata(majorDiatonicHarpProps)

test('when fit zoom level is selected the columnBounds is set to FIT', () => {
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: [0, 1] as const,
  } as GlobalState
  const unusedDispatcher = jest.fn()
  const { columnBounds: newColumnBounds } = getNewColumnBoundsForDispatcher(
    inputGlobal,
    unusedDispatcher,
    ZoomIds.Fit
  )
  const { columnBounds: sameColumnBounds } = getNewColumnBoundsForDispatcher(
    { ...inputGlobal, columnBounds: 'FIT' },
    unusedDispatcher,
    ZoomIds.Fit
  )

  expect(newColumnBounds).toStrictEqual('FIT')
  expect(sameColumnBounds).toStrictEqual('FIT')
})

test('when 7 hole zoom is selected and columnBounds is already 7 holes wide, the original columnBounds is returned', () => {
  const columnBounds1 = [0, 6] as const
  const columnBounds2 = [1, 7] as const
  const columnBounds3 = [3, 9] as const
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: columnBounds1,
  } as GlobalState
  const unusedDispatcher = jest.fn()
  const { columnBounds: sameColumnBounds1 } = getNewColumnBoundsForDispatcher(
    inputGlobal,
    unusedDispatcher,
    ZoomIds.Seven
  )
  const { columnBounds: sameColumnBounds2 } = getNewColumnBoundsForDispatcher(
    { ...inputGlobal, columnBounds: columnBounds2 },
    unusedDispatcher,
    ZoomIds.Seven
  )
  const { columnBounds: sameColumnBounds3 } = getNewColumnBoundsForDispatcher(
    { ...inputGlobal, columnBounds: columnBounds3 },
    unusedDispatcher,
    ZoomIds.Seven
  )

  expect(sameColumnBounds1).toStrictEqual(columnBounds1)
  expect(sameColumnBounds2).toStrictEqual(columnBounds2)
  expect(sameColumnBounds3).toStrictEqual(columnBounds3)
})

test('when 7 hole zoom is selected from existing FIT columnBounds, 0 index is used as the start column', () => {
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: 'FIT',
  } as GlobalState
  const unusedDispatcher = jest.fn()
  const { columnBounds: newColumnBounds } = getNewColumnBoundsForDispatcher(
    inputGlobal,
    unusedDispatcher,
    ZoomIds.Seven
  )
  expect(newColumnBounds).toStrictEqual([0, 6])
})

test('when 7 hole zoom is selected on activeHarpStrata which is less than 7 holes wide, the columnBounds are set to 7 wide with 0 as the start column', () => {
  const ROOT = {
    id: DegreeIds.Root,
    label: 'test',
  }
  const simplifiedDegreeMatrix: HarpFaceMatrix<Degree> = [[ROOT, ROOT, ROOT]]
  const inputGlobal = {
    activeHarpStrata: {
      ...majorDiatonicHarp,
      degreeMatrix: simplifiedDegreeMatrix,
    },
    columnBounds: [1, 7] as const,
  } as GlobalState
  const unusedDispatcher = jest.fn()
  const { columnBounds: newColumnBounds } = getNewColumnBoundsForDispatcher(
    inputGlobal,
    unusedDispatcher,
    ZoomIds.Seven
  )
  expect(newColumnBounds).toStrictEqual([0, 6])
})

test('when 7 hole zoom is selected and columnBounds is set above the end bounds the column bounds are rolled back to the top point', () => {
  const columnBounds = [4, 10] as const
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: columnBounds,
  } as GlobalState
  const unusedDispatcher = jest.fn()
  const {
    columnBounds: rolledBackColumnBounds,
  } = getNewColumnBoundsForDispatcher(
    inputGlobal,
    unusedDispatcher,
    ZoomIds.Seven
  )

  expect(rolledBackColumnBounds).toStrictEqual([3, 9])
})