import { setup } from './testSetup'

import { setGlobalReactNState } from './index'

test('that the global state is defined', () => {
  const { 0: global } = setup()
  expect(Object.keys(global).length).not.toBe(0)
})

test('that the confirmation string is set with the state in it', () => {
  expect(setGlobalReactNState).toEqual(
    expect.stringContaining('activeHarpStrata')
  )
})
