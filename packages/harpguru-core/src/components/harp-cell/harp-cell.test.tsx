import { useGlobal } from 'reactn'
import React from 'react'
import { DegreeIds, PitchIds } from 'harpparts'
import { render, fireEvent } from '@testing-library/react-native'

import { DisplayModes, ExperienceModes } from '../../types'
import {
  inactiveCellsHarpStrata,
  buildMockUseGlobalImplementation,
} from '../../test-resources'

import { HarpCell } from './harp-cell'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('A component is rendered with the Degree or Pitch value in its text view depending on the DisplayMode selected', () => {
  mockUseGlobal.mockImplementation(buildMockUseGlobalImplementation({}))
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
    harpfaceIndex: 0,
  } as const
  const { getByText, rerender } = render(<HarpCell {...harpCellProps} />)

  expect(getByText(DegreeIds.Fifth)).toBeTruthy()

  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      displayMode: DisplayModes.Pitch,
    })
  )

  rerender(<HarpCell {...harpCellProps} />)

  expect(getByText(PitchIds.D)).toBeTruthy()
})

test('A component is rendered with an a11y role of button', () => {
  mockUseGlobal.mockImplementation(buildMockUseGlobalImplementation({}))
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
    harpfaceIndex: 0,
  } as const
  const { getByRole } = render(<HarpCell {...harpCellProps} />)

  expect(getByRole('button')).toBeTruthy()
})

test('A component is rendered without an a11y role of button if it has no content', () => {
  mockUseGlobal.mockImplementation(buildMockUseGlobalImplementation({}))
  const harpCellProps = {
    yxCoord: [0, 0] as [0, 0],
    harpfaceIndex: 0,
  } as const
  const { queryByRole } = render(<HarpCell {...harpCellProps} />)

  expect(queryByRole('button')).toBeNull()
})

test.skip('A press of the componenet results in toggled active ids in the harpstrata passed to the paramaterised setter', () => {
  const setActiveHarpStrata = jest.fn()
  const harpCellProps = {
    activeHarpStrata: inactiveCellsHarpStrata,
    activeDisplayMode: DisplayModes.Degree,
    setActiveHarpStrata,
    yxCoord: [3, 0] as [3, 0],
    harpfaceIndex: 0,
  } as const

  const { getByText } = render(<HarpCell {...harpCellProps} />)

  fireEvent.press(getByText(DegreeIds.Second))

  const {
    mock: {
      calls: [[newHarpStrata]],
    },
  } = setActiveHarpStrata
  const {
    activeDegreeIds: newDegreeIds,
    activePitchIds: newPitchIds,
  } = newHarpStrata

  const expectedDegreeIds = [DegreeIds.Second]
  const expectedPitchIds = [PitchIds.D]

  expect(setActiveHarpStrata.mock.calls.length).toBe(1)
  expect(newDegreeIds).toStrictEqual(expectedDegreeIds)
  expect(newPitchIds).toStrictEqual(expectedPitchIds)
})

test('A snapshot of a populated cell', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
    })
  )
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
    harpfaceIndex: 0,
  } as const

  const { toJSON } = render(<HarpCell {...harpCellProps} />)
  expect(toJSON()).toMatchSnapshot()
})

test('A snapshot of an active cell', () => {
  mockUseGlobal.mockImplementation(buildMockUseGlobalImplementation({}))
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
    harpfaceIndex: 0,
  } as const

  const { toJSON } = render(<HarpCell {...harpCellProps} />)
  expect(toJSON()).toMatchSnapshot()
})

test('A snapshot of an empty cell', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
    })
  )
  const harpFaceProps = {
    yxCoord: [0, 0] as [0, 0],
    harpfaceIndex: 0,
  } as const

  const { toJSON } = render(<HarpCell {...harpFaceProps} />)
  expect(toJSON()).toMatchSnapshot()
})

test('A snapshot of an inactive cell in Explore mode', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      experienceMode: ExperienceModes.Explore,
    })
  )
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
    harpfaceIndex: 0,
  } as const

  const { toJSON } = render(<HarpCell {...harpCellProps} />)
  expect(toJSON()).toMatchSnapshot()
})

// The important difference between this and the previous is just that
// the contents of the cells should be hidden in Quiz mode.
test('A snapshot of an inactive cell in Quiz mode', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceHarpStrata: inactiveCellsHarpStrata,
      experienceMode: ExperienceModes.Quiz,
    })
  )
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
    harpfaceIndex: 0,
  } as const

  const { toJSON } = render(<HarpCell {...harpCellProps} />)
  expect(toJSON()).toMatchSnapshot()
})
