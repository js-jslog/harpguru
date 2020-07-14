import React from 'react'
import { PitchIds, DegreeIds } from 'harpstrata'
import { render, fireEvent } from '@testing-library/react-native'

import {
  inactiveCellsHarpFaceProps,
  activeCellsHarpFaceProps,
} from '../../testResources'
import { DisplayModes } from '../../../types'

import { HarpCell } from './index'

test('A component is rendered with the Degree or Pitch value in its text view depending on the DisplayMode selected', () => {
  const harpCellProps = {
    ...inactiveCellsHarpFaceProps,
    activeDisplayMode: DisplayModes.Degree,
    yxCoord: [3, 0] as [3, 0],
  }
  const { getByText, rerender } = render(<HarpCell {...harpCellProps} />)

  expect(getByText(DegreeIds.Second)).toBeTruthy()

  rerender(
    <HarpCell {...harpCellProps} activeDisplayMode={DisplayModes.Pitch} />
  )

  expect(getByText(PitchIds.D)).toBeTruthy()
})

test('A component is rendered with an a11y role of button', () => {
  const harpCellProps = {
    ...inactiveCellsHarpFaceProps,
    activeDisplayMode: DisplayModes.Degree,
    yxCoord: [3, 0] as [3, 0],
  }
  const { getByRole } = render(<HarpCell {...harpCellProps} />)

  expect(getByRole('button')).toBeTruthy()
})

test('A component is rendered without an a11y role of button if it has no content', () => {
  const harpCellProps = {
    ...inactiveCellsHarpFaceProps,
    activeDisplayMode: DisplayModes.Degree,
    yxCoord: [0, 0] as [0, 0],
  }
  const { queryByRole } = render(<HarpCell {...harpCellProps} />)

  expect(queryByRole('button')).toBeNull()
})

test.skip('A press of the componenet results in toggled active ids in the harpstrata passed to the paramaterised setter', () => {
  const setActiveHarpStrata = jest.fn()
  const harpCellProps = {
    ...inactiveCellsHarpFaceProps,
    activeDisplayMode: DisplayModes.Degree,
    setActiveHarpStrata,
    yxCoord: [3, 0] as [3, 0],
  }

  const { getByText } = render(<HarpCell {...harpCellProps} />)

  fireEvent.press(getByText(DegreeIds.Second))

  const {
    mock: {
      calls: [[newHarpStrata]],
    },
  } = setActiveHarpStrata
  const {
    isActiveComplex: {
      activeDegreeIds: newDegreeIds,
      activePitchIds: newPitchIds,
    },
  } = newHarpStrata

  const expectedDegreeIds = [DegreeIds.Second]
  const expectedPitchIds = [PitchIds.D]

  expect(setActiveHarpStrata.mock.calls.length).toBe(1)
  expect(newDegreeIds).toStrictEqual(expectedDegreeIds)
  expect(newPitchIds).toStrictEqual(expectedPitchIds)
})

test('A snapshot of a populated cell', () => {
  const setActiveHarpStrata = jest.fn()
  const harpCellProps = {
    ...inactiveCellsHarpFaceProps,
    activeDisplayMode: DisplayModes.Degree,
    setActiveHarpStrata,
    yxCoord: [3, 0] as [3, 0],
  }

  const { container } = render(<HarpCell {...harpCellProps} />)
  expect(container).toMatchSnapshot()
})

test('A snapshot of an active cell', () => {
  const setActiveHarpStrata = jest.fn()
  const harpCellProps = {
    ...activeCellsHarpFaceProps,
    activeDisplayMode: DisplayModes.Degree,
    setActiveHarpStrata,
    yxCoord: [3, 0] as [3, 0],
  }

  const { container } = render(<HarpCell {...harpCellProps} />)
  expect(container).toMatchSnapshot()
})

test('A snapshot of an empty cell', () => {
  const setActiveHarpStrata = jest.fn()
  const harpFaceProps = {
    ...inactiveCellsHarpFaceProps,
    activeDisplayMode: DisplayModes.Degree,
    setActiveHarpStrata,
    yxCoord: [0, 0] as [0, 0],
  }

  const { container } = render(<HarpCell {...harpFaceProps} />)
  expect(container).toMatchSnapshot()
})
