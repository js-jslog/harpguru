import React from 'react'
import { PitchIds } from 'harpstrata'
import { render, fireEvent, NativeTestEvent } from '@testing-library/react-native'

import { UpdateCategories } from '../types'
import type { GenericButtonProps } from '../types'
import { keyCHarpStrata, keyDHarpStrata } from '../testResources'

import { GenericButton } from './index'

test('GenericButton renders a component with the parameter label on it', () => {
  const activeHarpStrata = keyCHarpStrata
  const setActiveHarpStrata = jest.fn()
  const { HarpKey: updateCategory } = UpdateCategories
  const { C: id } = PitchIds

  const harpKeyUpdateProps: GenericButtonProps = {
    activeHarpStrata, setActiveHarpStrata, updateCategory, id
  }

  const { getByText } = render(<GenericButton {...harpKeyUpdateProps} />)

  expect(getByText(id)).toBeTruthy()
})

test('GenericButton renders a component which set\'s the expected harp strata to the paramaterised function', () => {
  const setActiveHarpStrata = jest.fn()
  const activeHarpStrata = keyDHarpStrata
  const { HarpKey: updateCategory } = UpdateCategories
  const { C: id } = PitchIds

  const harpKeyUpdateProps: GenericButtonProps = {
    activeHarpStrata, setActiveHarpStrata, updateCategory, id
  }

  const { getByText } = render(<GenericButton {...harpKeyUpdateProps} />)

  fireEvent(getByText(id), new NativeTestEvent('press'))

  expect(setActiveHarpStrata.mock.calls.length).toBe(1)
  expect(setActiveHarpStrata.mock.calls[0][0]).toStrictEqual(keyCHarpStrata)
})

test('GenericButton renders a disabled component if it\'s id matches the active id in that category', () => {
  const setActiveHarpStrata = jest.fn()
  const activeHarpStrata = keyCHarpStrata
  const { C: id } = PitchIds
  const { HarpKey: updateCategory } = UpdateCategories

  const harpKeyUpdateProps: GenericButtonProps = {
    activeHarpStrata, setActiveHarpStrata, updateCategory, id
  }

  const { getByText } = render(<GenericButton {...harpKeyUpdateProps} />)

  fireEvent(getByText(id), new NativeTestEvent('press'))

  expect(setActiveHarpStrata.mock.calls.length).toBe(0)
})
