import React from 'react'
import {
  render,
  fireEvent,
  NativeTestEvent,
} from '@testing-library/react-native'

import { DisplayModeTogglerProps } from '../types'
import { DisplayModes } from '../../../HarpFace'

import { DisplayModeToggler } from './index'

test('DisplayModeToggler renders a component with "Display mode" title', () => {
  const setActiveDisplayMode = jest.fn()
  const displayModeTogglerProps: DisplayModeTogglerProps = {
    setActiveDisplayMode,
  }
  const { getByLabelText } = render(
    <DisplayModeToggler {...displayModeTogglerProps} />
  )

  expect(getByLabelText('Display mode')).toBeTruthy()
})

test('DisplayModeToggler renders a component with both "Degree" and "Pitch" buttons', () => {
  const setActiveDisplayMode = jest.fn()
  const displayModeTogglerProps: DisplayModeTogglerProps = {
    setActiveDisplayMode,
  }
  const { getByText } = render(
    <DisplayModeToggler {...displayModeTogglerProps} />
  )

  expect(getByText(DisplayModes.Degree)).toBeTruthy()
  expect(getByText(DisplayModes.Pitch)).toBeTruthy()
})

test('DisplayModeToggler Degree button calls a paramaterised function with its identity when it is clicked', () => {
  const setActiveDisplayMode = jest.fn()
  const displayModeTogglerProps: DisplayModeTogglerProps = {
    setActiveDisplayMode,
  }
  const { getByText } = render(
    <DisplayModeToggler {...displayModeTogglerProps} />
  )

  fireEvent(getByText(DisplayModes.Degree), new NativeTestEvent('press'))

  expect(setActiveDisplayMode.mock.calls.length).toBe(1)
  expect(setActiveDisplayMode.mock.calls[0][0]).toBe(DisplayModes.Degree)
})

test('DisplayModeToggler Pitch button calls a paramaterised function with its identity when it is clicked', () => {
  const setActiveDisplayMode = jest.fn()
  const displayModeTogglerProps: DisplayModeTogglerProps = {
    setActiveDisplayMode,
  }
  const { getByText } = render(
    <DisplayModeToggler {...displayModeTogglerProps} />
  )

  fireEvent.press(getByText(DisplayModes.Pitch))

  expect(setActiveDisplayMode.mock.calls.length).toBe(1)
  expect(setActiveDisplayMode.mock.calls[0][0]).toBe(DisplayModes.Pitch)
})
