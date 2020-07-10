import React from 'react'
import { PozitionIds } from 'harpstrata'
import {
  render,
  fireEvent,
  NativeTestEvent,
} from '@testing-library/react-native'

import {
  firstPozitionHarpStrata,
  secondPozitionHarpStrata,
} from '../testResources'
import type { PozitionButtonProps } from '../../GenericButton'

import { PozitionButton } from './index'

test('PozitionButton renders a component with the parameter label on it', () => {
  const setActiveHarpStrata = jest.fn()
  const activeHarpStrata = firstPozitionHarpStrata
  const { First: id } = PozitionIds

  const pozitionButtonProps: PozitionButtonProps = {
    id,
    activeHarpStrata,
    setActiveHarpStrata,
  }

  const { getByText } = render(<PozitionButton {...pozitionButtonProps} />)

  expect(getByText(id)).toBeTruthy()
})

test('PozitionButton renders a component which sets the expected harp strata to the paramaterised function', () => {
  const setActiveHarpStrata = jest.fn()
  const activeHarpStrata = firstPozitionHarpStrata
  const { Second: id } = PozitionIds

  const pozitionButtonProps: PozitionButtonProps = {
    id,
    activeHarpStrata,
    setActiveHarpStrata,
  }

  const { getByText } = render(<PozitionButton {...pozitionButtonProps} />)

  fireEvent(getByText(id), new NativeTestEvent('press'))

  expect(setActiveHarpStrata.mock.calls.length).toBe(1)
  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(
    secondPozitionHarpStrata
  )
})

test('PozitionButton renders a disabled component if its id matches the active pozition', () => {
  const setActiveHarpStrata = jest.fn()
  const activeHarpStrata = firstPozitionHarpStrata
  const { First: id } = PozitionIds

  const pozitionButtonProps: PozitionButtonProps = {
    id,
    activeHarpStrata,
    setActiveHarpStrata,
  }

  const { getByText } = render(<PozitionButton {...pozitionButtonProps} />)

  fireEvent(getByText(id), new NativeTestEvent('press'))
  expect(setActiveHarpStrata.mock.calls.length).toBe(0)
})
