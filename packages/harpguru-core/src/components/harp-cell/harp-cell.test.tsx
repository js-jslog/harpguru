import { useGlobal } from 'reactn'
import React from 'react'
import { DegreeIds, PitchIds } from 'harpparts'
import { render, fireEvent } from '@testing-library/react-native'

import { DisplayModes, ExperienceModes } from '../../types'
import {
  inactiveCellsHarpStrata,
  activeCellsHarpStrata,
} from '../../test-resources'

import { HarpCell } from './harp-cell'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('A component is rendered with the Degree or Pitch value in its text view depending on the DisplayMode selected', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    return undefined
  })
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
  }
  const { getByText, rerender } = render(<HarpCell {...harpCellProps} />)

  expect(getByText(DegreeIds.Second)).toBeTruthy()
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Pitch]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    return undefined
  })

  rerender(<HarpCell {...harpCellProps} />)

  expect(getByText(PitchIds.D)).toBeTruthy()
})

test('A component is rendered with an a11y role of button', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    return undefined
  })
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
  }
  const { getByRole } = render(<HarpCell {...harpCellProps} />)

  expect(getByRole('button')).toBeTruthy()
})

test('A component is rendered without an a11y role of button if it has no content', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    return undefined
  })
  const harpCellProps = {
    yxCoord: [0, 0] as [0, 0],
  }
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
  }

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
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    return undefined
  })
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
  }

  const { container } = render(<HarpCell {...harpCellProps} />)
  expect(container).toMatchSnapshot()
})

test('A snapshot of an active cell', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [activeCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    return undefined
  })
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
  }

  const { container } = render(<HarpCell {...harpCellProps} />)
  expect(container).toMatchSnapshot()
})

test('A snapshot of an empty cell', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    return undefined
  })
  const harpFaceProps = {
    yxCoord: [0, 0] as [0, 0],
  }

  const { container } = render(<HarpCell {...harpFaceProps} />)
  expect(container).toMatchSnapshot()
})

test('A snapshot of an inactive cell in Explore mode', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Explore]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    return undefined
  })
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
  }

  const { container } = render(<HarpCell {...harpCellProps} />)
  expect(container).toMatchSnapshot()
})

// The important difference between this and the previous is just that
// the contents of the cells should be hidden in Quiz mode.
test('A snapshot of an inactive cell in Quiz mode', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'activeExperienceMode') return [ExperienceModes.Quiz]
    if (stateItem === 'activeDisplayMode') return [DisplayModes.Degree]
    if (stateItem === 'bufferedActivityToggles') return [[]]
    return undefined
  })
  const harpCellProps = {
    yxCoord: [3, 0] as [3, 0],
  }

  const { container } = render(<HarpCell {...harpCellProps} />)
  expect(container).toMatchSnapshot()
})
