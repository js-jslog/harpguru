import { Linking, Text } from 'react-native'
import React from 'react'
import { readSetupUrl } from 'harpstrata'
import { act, render } from '@testing-library/react-native'

import {
  readIncomingSetupLink,
  useIncomingSetupLink,
} from './use-incoming-setup-link'

const link = 'https://harpguru.com/s/?t=major-diatonic&k=C&p=2&s=blues'

describe('readIncomingSetupLink', () => {
  test('A setup link is read, and the browser gets its query as written, at /s/web', () => {
    expect(readIncomingSetupLink(link)).toEqual({
      setup: readSetupUrl(link),
      browserUrl: 'https://harpguru.com/s/web?t=major-diatonic&k=C&p=2&s=blues',
    })
  })

  test('A fragment and surrounding space are left behind', () => {
    expect(readIncomingSetupLink(` ${link}#top `)?.browserUrl).toBe(
      'https://harpguru.com/s/web?t=major-diatonic&k=C&p=2&s=blues'
    )
  })

  test('A link without a query opens the default setup, and the bare /s/web', () => {
    expect(readIncomingSetupLink('https://harpguru.com/s/')?.browserUrl).toBe(
      'https://harpguru.com/s/web'
    )
  })

  test.each([
    'https://harpguru.com/s/web?t=major-diatonic',
    'https://harpguru.com/t/major-diatonic',
    'https://harpguru.com/e/?t=major-diatonic',
    'http://harpguru.com/s/?t=major-diatonic',
    'https://evil.example/s/?t=major-diatonic',
    'https://harpguru.com.evil.example/s/?t=major-diatonic',
    'harpguru://s/?t=major-diatonic',
    '',
    `https://harpguru.com/s/?d=${'1,'.repeat(600)}`,
  ])('%s is refused', (url) => {
    expect(readIncomingSetupLink(url)).toBeUndefined()
  })
})

describe('useIncomingSetupLink', () => {
  type UrlListener = (event: { url: string }) => void
  let listener: UrlListener | undefined
  const remove = jest.fn()

  const Probe = () => {
    const [incoming, clear] = useIncomingSetupLink()
    return (
      <Text testID="probe" onPress={clear}>
        {incoming?.browserUrl ?? 'none'}
      </Text>
    )
  }

  const mockInitialUrl = (url: string | null) =>
    jest.spyOn(Linking, 'getInitialURL').mockResolvedValue(url)

  beforeEach(() => {
    listener = undefined
    remove.mockClear()
    jest
      .spyOn(Linking, 'addEventListener')
      .mockImplementation((_type, handler) => {
        listener = handler as UrlListener
        return { remove } as unknown as ReturnType<
          typeof Linking.addEventListener
        >
      })
  })

  afterEach(() => jest.restoreAllMocks())

  const flush = () => act(() => Promise.resolve())

  test('A link that started the app is taken up', async () => {
    mockInitialUrl(link)
    const { getByTestId } = render(<Probe />)
    await flush()
    expect(getByTestId('probe').props.children).toBe(
      'https://harpguru.com/s/web?t=major-diatonic&k=C&p=2&s=blues'
    )
  })

  test('A link handed over while running is taken up, and clearing it lets it go', async () => {
    mockInitialUrl(null)
    const { getByTestId } = render(<Probe />)
    await flush()
    expect(getByTestId('probe').props.children).toBe('none')

    act(() => listener?.({ url: link }))
    expect(getByTestId('probe').props.children).not.toBe('none')

    act(() => getByTestId('probe').props.onPress())
    expect(getByTestId('probe').props.children).toBe('none')
  })

  test('A refused link changes nothing, even one arriving over an accepted one', async () => {
    mockInitialUrl('https://harpguru.com/s/web?t=major-diatonic')
    const { getByTestId } = render(<Probe />)
    await flush()
    expect(getByTestId('probe').props.children).toBe('none')

    act(() => listener?.({ url: link }))
    const {
      props: { children: accepted },
    } = getByTestId('probe')
    act(() => listener?.({ url: 'https://evil.example/s/?k=D' }))
    expect(getByTestId('probe').props.children).toBe(accepted)
  })

  test('The listener is removed when the app lets go of it', async () => {
    mockInitialUrl(null)
    const { unmount } = render(<Probe />)
    await flush()
    unmount()
    expect(remove).toHaveBeenCalledTimes(1)
  })
})
