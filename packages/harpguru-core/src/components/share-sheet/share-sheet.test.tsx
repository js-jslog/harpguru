import { Share } from 'react-native'
import React from 'react'
import { readSetupUrl } from 'harpstrata'
import type { Setup } from 'harpstrata'
import { fireEvent, render } from '@testing-library/react-native'

import { getStateFromSetup } from '../../utils'
import { createHarpGuruStore, StoreProvider } from '../../store'

import { ShareSheet } from './share-sheet'

const link =
  'https://harpguru.com/s/?t=major-diatonic&k=Bb&p=3&d=1,3b,4,5b,5,7b&m=pitch'

const renderWithSetup = (isVisible: boolean, onDismiss = jest.fn()) => {
  const store = createHarpGuruStore(1)
  store.setState(getStateFromSetup(readSetupUrl(link) as Setup))
  return render(
    <StoreProvider pageNumber={1} store={store}>
      <ShareSheet isVisible={isVisible} onDismiss={onDismiss} />
    </StoreProvider>
  )
}

afterEach(() => jest.restoreAllMocks())

test('Nothing is drawn while it is closed', () => {
  const { queryByTestId } = renderWithSetup(false)
  expect(queryByTestId('qr-code')).toBeNull()
})

test('It writes the harp face\'s setup as a canonical link, and draws its QR code', () => {
  const { getByTestId } = renderWithSetup(true)
  expect(getByTestId('share-url').props.children).toBe(link)
  expect(getByTestId('qr-code').props.children.length).toBeGreaterThan(0)
})

test('Share link hands the link to the system share sheet, and Close closes', () => {
  const share = jest
    .spyOn(Share, 'share')
    .mockResolvedValue({ action: Share.sharedAction })
  const onDismiss = jest.fn()
  const { getByText } = renderWithSetup(true, onDismiss)

  fireEvent.press(getByText('Share link'))
  expect(share).toHaveBeenCalledWith({ message: link, url: link })

  fireEvent.press(getByText('Close'))
  expect(onDismiss).toHaveBeenCalledTimes(1)
})
