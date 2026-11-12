import { Linking } from 'react-native'
import React from 'react'
import { getPropsForHarpStrata, readSetupUrl } from 'harpstrata'
import type { Setup } from 'harpstrata'
import { act, fireEvent, render } from '@testing-library/react-native'

import { DisplayModes, ExperienceModes } from '../../types'
import { createHarpGuruStore } from '../../store'
import type { HarpGuruStoreInstance } from '../../store'

import { OpenIncomingSetupLink } from './open-incoming-setup-link'

const link = 'https://harpguru.com/s/?t=major-diatonic&k=Bb&p=3&s=blues&m=pitch'
const { harpStrataProps: linkProps } = readSetupUrl(link) as Setup

const propsOf = (store: HarpGuruStoreInstance) =>
  getPropsForHarpStrata(store.getState().activeHarpStrata, 'DEGREE')

const renderOpenedBy = async (url: string | null, faceCount = 2) => {
  jest.spyOn(Linking, 'getInitialURL').mockResolvedValue(url)
  const stores = Array.from({ length: faceCount }, () => createHarpGuruStore(1))
  const showHarpFace = jest.fn()
  const rendered = render(
    <OpenIncomingSetupLink harpFaceStores={stores} showHarpFace={showHarpFace} />
  )
  await act(() => Promise.resolve())
  return { ...rendered, stores, showHarpFace }
}

afterEach(() => jest.restoreAllMocks())

test('Opened by a setup link, the app asks where it goes: each harp face, or the browser', async () => {
  const { getByText } = await renderOpenedBy(link, 3)
  getByText('Bb harp · 3rd position · Major diatonic')
  getByText('Harp face 1')
  getByText('Harp face 2')
  getByText('Harp face 3')
  getByText('Open in the browser')
})

test('Opened by anything else, the app asks nothing', async () => {
  const { queryByText } = await renderOpenedBy(
    'https://harpguru.com/s/web?t=major-diatonic&k=Bb'
  )
  expect(queryByText('Open in the browser')).toBeNull()
})

test('The harp face chosen takes the setup, in Explore, and is shown; the other is left alone', async () => {
  const { getByText, queryByText, stores, showHarpFace } =
    await renderOpenedBy(link)
  const [first, second] = stores
  first.setState({ activeExperienceMode: ExperienceModes.Quiz })
  second.setState({ activeExperienceMode: ExperienceModes.Quiz })
  const firstBefore = propsOf(first)

  fireEvent.press(getByText('Harp face 2'))

  expect(propsOf(second)).toEqual(linkProps)
  expect(second.getState().activeDisplayMode).toBe(DisplayModes.Pitch)
  expect(second.getState().activeExperienceMode).toBe(ExperienceModes.Explore)
  expect(propsOf(first)).toEqual(firstBefore)
  expect(first.getState().activeExperienceMode).toBe(ExperienceModes.Quiz)
  expect(showHarpFace).toHaveBeenCalledWith(1)
  expect(queryByText('Open in the browser')).toBeNull()
})

test('The browser is handed the link at /s/web, as it was written, and no harp face changes', async () => {
  const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(true)
  const { getByText, queryByText, stores, showHarpFace } =
    await renderOpenedBy(link)
  const before = stores.map(propsOf)

  fireEvent.press(getByText('Open in the browser'))

  expect(openURL).toHaveBeenCalledWith(
    'https://harpguru.com/s/web?t=major-diatonic&k=Bb&p=3&s=blues&m=pitch'
  )
  expect(stores.map(propsOf)).toEqual(before)
  expect(showHarpFace).not.toHaveBeenCalled()
  expect(queryByText('Open in the browser')).toBeNull()
})

test('Cancel leaves every harp face as it was', async () => {
  const { getByText, queryByText, stores } = await renderOpenedBy(link)
  const before = stores.map(propsOf)
  fireEvent.press(getByText('Cancel'))
  expect(stores.map(propsOf)).toEqual(before)
  expect(queryByText('Open in the browser')).toBeNull()
})
