import React from 'react'
import { readSetupUrl } from 'harpstrata'
import type { Setup } from 'harpstrata'
import { fireEvent, render } from '@testing-library/react-native'

import { OpenSetupPicker, describeSetup } from './open-setup-picker'

const setup = readSetupUrl(
  'https://harpguru.com/s/?t=major-diatonic&k=Bb&p=3&s=blues'
) as Setup

const destinations = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    label: `Harp face ${index + 1}`,
    onChoose: jest.fn(),
  }))

test('A setup is described by its harp key, position and tuning', () => {
  expect(describeSetup(setup)).toBe('Bb harp · 3rd position · Major diatonic')
})

test('Nothing is shown until there is a setup to open', () => {
  const { queryByText } = render(
    <OpenSetupPicker
      setup={undefined}
      harpFaces={destinations(2)}
      onOpenInBrowser={jest.fn()}
      onDismiss={jest.fn()}
    />
  )
  expect(queryByText('Open in the browser')).toBeNull()
})

test('Every harp face it is given is offered, however many, and each goes to its own', () => {
  const harpFaces = destinations(3)
  const { getByText } = render(
    <OpenSetupPicker
      setup={setup}
      harpFaces={harpFaces}
      onOpenInBrowser={jest.fn()}
      onDismiss={jest.fn()}
    />
  )
  getByText('Bb harp · 3rd position · Major diatonic')

  fireEvent.press(getByText('Harp face 3'))
  expect(harpFaces[2].onChoose).toHaveBeenCalledTimes(1)
  expect(harpFaces[0].onChoose).not.toHaveBeenCalled()
  expect(harpFaces[1].onChoose).not.toHaveBeenCalled()
})

test('The browser and cancel are always offered', () => {
  const onOpenInBrowser = jest.fn()
  const onDismiss = jest.fn()
  const { getByText } = render(
    <OpenSetupPicker
      setup={setup}
      harpFaces={[]}
      onOpenInBrowser={onOpenInBrowser}
      onDismiss={onDismiss}
    />
  )
  fireEvent.press(getByText('Open in the browser'))
  expect(onOpenInBrowser).toHaveBeenCalledTimes(1)
  fireEvent.press(getByText('Cancel'))
  expect(onDismiss).toHaveBeenCalledTimes(1)
})
