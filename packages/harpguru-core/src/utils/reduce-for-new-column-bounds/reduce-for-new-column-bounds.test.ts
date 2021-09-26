import type { Dispatch } from 'reactn/default'
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
import type { GlobalState } from '../../types'

import { reduceForNewColumnBounds } from './reduce-for-new-column-bounds'

const baseHarpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  valvingId: ValvingIds.NotValved,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [],
}
const majorDiatonicHarpProps = baseHarpStrataProps
const majorDiatonicHarp = getHarpStrata(majorDiatonicHarpProps)

// TODO: Consider adding some tests for when the activeHarpStrata has changed since previous global state
// This might be unnecessary since the previous harpstrata is never actually important. It's all about the
// previous columnBounds and the new harpstrata.

// The usecase here is that a new activeHarpStrata has been set, the columnBounds are being reevaluated, but nothing
// has to change because FIT is always appropriate.
test('when no zoom level is provided and columnBounds is already FIT, the columnBounds is not changed', () => {
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: 'FIT',
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch
  const { columnBounds } = reduceForNewColumnBounds(
    inputGlobal,
    unusedDispatcher,
    undefined,
    majorDiatonicHarp
  )

  expect(columnBounds).toStrictEqual('FIT')
})

test('when no zoom level or new harp strata are provided and columnBounds is already FIT, the columnBounds is not changed', () => {
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: 'FIT',
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch
  const { columnBounds } = reduceForNewColumnBounds(
    inputGlobal,
    unusedDispatcher
  )

  expect(columnBounds).toStrictEqual('FIT')
})

test('when fit zoom level is selected the columnBounds is set to FIT', () => {
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: [0, 1] as const,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch
  const { columnBounds: newColumnBounds } = reduceForNewColumnBounds(
    inputGlobal,
    unusedDispatcher,
    ZoomIds.Fit,
    majorDiatonicHarp
  )
  const { columnBounds: sameColumnBounds } = reduceForNewColumnBounds(
    { ...inputGlobal, columnBounds: 'FIT' },
    unusedDispatcher,
    ZoomIds.Fit,
    majorDiatonicHarp
  )

  expect(newColumnBounds).toStrictEqual('FIT')
  expect(sameColumnBounds).toStrictEqual('FIT')
})

test('when fit zoom level is selected but no new harpstrata is, the columnBounds is set to FIT', () => {
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: [0, 1] as const,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch
  const { columnBounds: newColumnBounds } = reduceForNewColumnBounds(
    inputGlobal,
    unusedDispatcher,
    ZoomIds.Fit,
    undefined
  )
  const { columnBounds: sameColumnBounds } = reduceForNewColumnBounds(
    { ...inputGlobal, columnBounds: 'FIT' },
    unusedDispatcher,
    ZoomIds.Fit,
    majorDiatonicHarp
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
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch
  const { columnBounds: sameColumnBounds1 } = reduceForNewColumnBounds(
    inputGlobal,
    unusedDispatcher,
    ZoomIds.Seven,
    majorDiatonicHarp
  )
  const { columnBounds: sameColumnBounds2 } = reduceForNewColumnBounds(
    { ...inputGlobal, columnBounds: columnBounds2 },
    unusedDispatcher,
    ZoomIds.Seven,
    majorDiatonicHarp
  )
  const { columnBounds: sameColumnBounds3 } = reduceForNewColumnBounds(
    { ...inputGlobal, columnBounds: columnBounds3 },
    unusedDispatcher,
    ZoomIds.Seven,
    majorDiatonicHarp
  )

  expect(sameColumnBounds1).toStrictEqual(columnBounds1)
  expect(sameColumnBounds2).toStrictEqual(columnBounds2)
  expect(sameColumnBounds3).toStrictEqual(columnBounds3)
})

test('when columnBounds is already 7 holes wide and new activeHarpStrata can handle existing columnBounds range, the original columnBounds is returned', () => {
  const columnBounds = [3, 9] as const
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: columnBounds,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch
  const { columnBounds: sameColumnBounds1 } = reduceForNewColumnBounds(
    inputGlobal,
    unusedDispatcher,
    undefined,
    majorDiatonicHarp
  )

  expect(sameColumnBounds1).toStrictEqual(columnBounds)
})

test('when 7 hole zoom is selected from existing FIT columnBounds, 0 index is used as the start column', () => {
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: 'FIT',
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch
  const { columnBounds: newColumnBounds } = reduceForNewColumnBounds(
    inputGlobal,
    unusedDispatcher,
    ZoomIds.Seven,
    majorDiatonicHarp
  )
  expect(newColumnBounds).toStrictEqual([0, 6])
})

test('when 7 hole zoom is selected on activeHarpStrata which is less than 7 holes wide, the columnBounds are set to 7 wide with 0 as the start column', () => {
  const ROOT = {
    id: DegreeIds.Root,
    label: 'test',
  }
  const simplifiedDegreeMatrix: HarpFaceMatrix<Degree> = [[ROOT, ROOT, ROOT]]
  const activeHarpStrata = {
    ...majorDiatonicHarp,
    degreeMatrix: simplifiedDegreeMatrix,
  }
  const inputGlobal = {
    activeHarpStrata,
    columnBounds: [1, 7] as const,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch
  const { columnBounds: newColumnBounds } = reduceForNewColumnBounds(
    inputGlobal,
    unusedDispatcher,
    ZoomIds.Seven,
    activeHarpStrata
  )
  expect(newColumnBounds).toStrictEqual([0, 6])
})

test('when new activeHarpStrata which is less than 7 holes wide is selected when columnBounds are set with a range of 7, that range is preserved but the start index is set to 0', () => {
  const ROOT = {
    id: DegreeIds.Root,
    label: 'test',
  }
  const simplifiedDegreeMatrix: HarpFaceMatrix<Degree> = [[ROOT, ROOT, ROOT]]
  const activeHarpStrata = {
    ...majorDiatonicHarp,
    degreeMatrix: simplifiedDegreeMatrix,
  }
  const inputGlobal = {
    activeHarpStrata,
    columnBounds: [1, 7] as const,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch
  const { columnBounds: newColumnBounds } = reduceForNewColumnBounds(
    inputGlobal,
    unusedDispatcher,
    undefined,
    activeHarpStrata
  )
  expect(newColumnBounds).toStrictEqual([0, 6])
})

test('when 7 hole zoom is selected and columnBounds is set above the end bounds the column bounds are rolled back to the top point', () => {
  const columnBounds = [4, 10] as const
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: columnBounds,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch
  const { columnBounds: rolledBackColumnBounds } = reduceForNewColumnBounds(
    inputGlobal,
    unusedDispatcher,
    ZoomIds.Seven,
    majorDiatonicHarp
  )

  expect(rolledBackColumnBounds).toStrictEqual([3, 9])
})

test('when activeHarpStrata is selected which can handle the columnBounds range, but not its endColumn index, the top point is drawn back appropriately', () => {
  const columnBounds = [4, 10] as const
  const inputGlobal = {
    activeHarpStrata: majorDiatonicHarp,
    columnBounds: columnBounds,
  } as GlobalState
  const unusedDispatcher = (jest.fn() as unknown) as Dispatch
  const { columnBounds: rolledBackColumnBounds } = reduceForNewColumnBounds(
    inputGlobal,
    unusedDispatcher,
    undefined,
    majorDiatonicHarp
  )

  expect(rolledBackColumnBounds).toStrictEqual([3, 9])
})
