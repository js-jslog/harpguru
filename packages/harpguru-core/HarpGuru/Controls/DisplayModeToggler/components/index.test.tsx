import { render, fireEvent } from 'react-native-testing-library'
import React from 'react'

import { DisplayModeTogglerProps } from '../types'
import { DisplayModes } from '../../../HarpFace'

import { DisplayModeToggler } from './index'

test('DisplayModeToggler renders a component with \'Display mode\' title', () => {
  const setActiveDisplayMode = jest.fn()
  const displayModeTogglerProps: DisplayModeTogglerProps = { setActiveDisplayMode }
  const { getByA11yLabel } = render(<DisplayModeToggler {...displayModeTogglerProps} />)

  expect(getByA11yLabel('Display mode')).toBeTruthy()
})

test('DisplayModeToggler renders a component with both \'Degree\' and \'Pitch\' buttons', () => {
  const setActiveDisplayMode = jest.fn()
  const displayModeTogglerProps: DisplayModeTogglerProps = { setActiveDisplayMode }
  const { getByA11yLabel } = render(<DisplayModeToggler {...displayModeTogglerProps} />)


  expect(getByA11yLabel(DisplayModes.Degree)).toBeTruthy()
  expect(getByA11yLabel(DisplayModes.Pitch)).toBeTruthy()
})

test('DisplayModeToggler Degree button calls a paramaterised function with it\'s identity when it is clicked', () => {
  const setActiveDisplayMode = jest.fn()
  const displayModeTogglerProps: DisplayModeTogglerProps = { setActiveDisplayMode }
  const { getByA11yLabel } = render(<DisplayModeToggler {...displayModeTogglerProps} />)

  fireEvent.press(getByA11yLabel(DisplayModes.Degree))

  expect(setActiveDisplayMode.mock.calls.length).toBe(1)
  expect(setActiveDisplayMode.mock.calls[0][0]).toBe(DisplayModes.Degree)
})

test('DisplayModeToggler Pitch button calls a paramaterised function with it\'s identity when it is clicked', () => {
  const setActiveDisplayMode = jest.fn()
  const displayModeTogglerProps: DisplayModeTogglerProps = { setActiveDisplayMode }
  const { getByA11yLabel } = render(<DisplayModeToggler {...displayModeTogglerProps} />)

  fireEvent.press(getByA11yLabel(DisplayModes.Pitch))

  expect(setActiveDisplayMode.mock.calls.length).toBe(1)
  expect(setActiveDisplayMode.mock.calls[0][0]).toBe(DisplayModes.Pitch)
})
