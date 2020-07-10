import React from 'react'
import { PitchIds } from 'harpstrata'
import {
  render,
  fireEvent,
  NativeTestEvent,
} from '@testing-library/react-native'

import { keyCHarpStrata, keyDHarpStrata } from '../testResources'
import type { HarpKeyButtonProps } from '../../GenericButton'

import { HarpKeyButton } from './index'

test('HarpKeyButton renders a component with the parameter label on it', () => {
  const setActiveHarpStrata = jest.fn()
  const activeHarpStrata = keyDHarpStrata
  const { C: id } = PitchIds

  const pitchButtonProps: HarpKeyButtonProps = {
    id,
    activeHarpStrata,
    setActiveHarpStrata,
  }

  const { getByText } = render(<HarpKeyButton {...pitchButtonProps} />)

  expect(getByText(id)).toBeTruthy()
})

test('HarpKeyButton renders a component which sets the expected harp strata to the paramaterised function', () => {
  const setActiveHarpStrata = jest.fn()
  const activeHarpStrata = keyDHarpStrata
  const { C: id } = PitchIds

  const pitchButtonProps: HarpKeyButtonProps = {
    id,
    activeHarpStrata,
    setActiveHarpStrata,
  }

  const { getByText } = render(<HarpKeyButton {...pitchButtonProps} />)

  fireEvent(getByText(id), new NativeTestEvent('press'))

  expect(setActiveHarpStrata.mock.calls.length).toBe(1)
  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(keyCHarpStrata)
})

test('HarpKeyButton renders a disabled component if its id matches the active harp pitch', () => {
  const setActiveHarpStrata = jest.fn()
  const activeHarpStrata = keyCHarpStrata
  const { C: id } = PitchIds

  const pitchButtonProps: HarpKeyButtonProps = {
    id,
    activeHarpStrata,
    setActiveHarpStrata,
  }

  const { getByText } = render(<HarpKeyButton {...pitchButtonProps} />)

  fireEvent(getByText(id), new NativeTestEvent('press'))

  expect(setActiveHarpStrata.mock.calls.length).toBe(0)
})
