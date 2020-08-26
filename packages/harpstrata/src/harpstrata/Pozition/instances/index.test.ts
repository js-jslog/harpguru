import { PozitionIds } from '../types'

import { POZITION_INSTANCES } from './index'
test('POZITION_INSTANCES has exactly 12 entries', () => {
  expect(Object.keys(POZITION_INSTANCES).length).toBe(12)
})

test('POZITION_INSTANCES has a mapping for each of the PozitionIds', () => {
  expect(POZITION_INSTANCES[PozitionIds.First]).toBeTruthy()
  expect(POZITION_INSTANCES[PozitionIds.Second]).toBeTruthy()
  expect(POZITION_INSTANCES[PozitionIds.Third]).toBeTruthy()
  expect(POZITION_INSTANCES[PozitionIds.Fourth]).toBeTruthy()
  expect(POZITION_INSTANCES[PozitionIds.Fifth]).toBeTruthy()
  expect(POZITION_INSTANCES[PozitionIds.Sixth]).toBeTruthy()
  expect(POZITION_INSTANCES[PozitionIds.Seventh]).toBeTruthy()
  expect(POZITION_INSTANCES[PozitionIds.Eighth]).toBeTruthy()
  expect(POZITION_INSTANCES[PozitionIds.Ninth]).toBeTruthy()
  expect(POZITION_INSTANCES[PozitionIds.Tenth]).toBeTruthy()
  expect(POZITION_INSTANCES[PozitionIds.Eleventh]).toBeTruthy()
  expect(POZITION_INSTANCES[PozitionIds.Twelfth]).toBeTruthy()
})

test('Each of the Pozition objects id is mapped from and identical key, thus also guaranteeing unique ids in the instances', () => {
  Object.keys(POZITION_INSTANCES).forEach((key) => {
    const { [key as PozitionIds]: instance } = POZITION_INSTANCES
    expect(instance.id).toBe(key)
  })
})

test('Each of the rootOffsets is only seen in a single mapped instance', () => {
  const offsetSeen = new Array(12).fill(false)
  Object.values(POZITION_INSTANCES).forEach((instance) => {
    const { rootOffset } = instance
    expect(typeof rootOffset).toBe('number')
    expect(offsetSeen[rootOffset]).toBe(false)
    offsetSeen[rootOffset] = true
  })
})
