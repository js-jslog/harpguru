import {
  DegreeIds,
  PitchIds,
  PozitionIds,
  TuningIds,
  ValvingIds,
} from 'harpparts'

import { DisplayModes } from '../types'

import {
  defaultSetup,
  readSetupQuery,
  readSetupUrl,
  writeSetupQuery,
  writeSetupUrl,
} from './setup-url'
import type { Setup } from './setup-url'

const { Root, Flat3, Fourth, Flat5, Fifth, Flat7, Second, Third, Sixth } =
  DegreeIds

const bluesInA: Setup = {
  harpStrataProps: {
    tuningId: TuningIds.PaddyRichter,
    valvingId: ValvingIds.HalfValved,
    pozitionId: PozitionIds.Third,
    harpKeyId: PitchIds.Bb,
    activeIds: [Root, Flat3, Fourth, Flat5, Fifth, Flat7],
  },
  displayMode: DisplayModes.Pitch,
}

test('A setup is written canonically', () => {
  expect(writeSetupQuery(bluesInA)).toBe(
    't=paddy-richter&k=Bb&p=3&d=1,3b,4,5b,5,7b&m=pitch&v=half'
  )
  expect(writeSetupQuery(defaultSetup)).toBe('t=major-diatonic&k=C&p=2&d=')
})

test('A setup survives being written and read back', () => {
  expect(readSetupQuery(writeSetupQuery(bluesInA))).toStrictEqual(bluesInA)
  expect(readSetupQuery(writeSetupQuery(defaultSetup))).toStrictEqual(
    defaultSetup
  )
})

test('A setup link and its open-in-browser twin differ only in the path', () => {
  expect(writeSetupUrl(bluesInA)).toBe(
    'https://harpguru.com/s/?t=paddy-richter&k=Bb&p=3&d=1,3b,4,5b,5,7b&m=pitch&v=half'
  )
  expect(writeSetupUrl(bluesInA, { openInBrowser: true })).toBe(
    'https://harpguru.com/s/web?t=paddy-richter&k=Bb&p=3&d=1,3b,4,5b,5,7b&m=pitch&v=half'
  )
})

test('An empty query is the default setup', () => {
  expect(readSetupQuery('')).toStrictEqual(defaultSetup)
  expect(readSetupQuery('?')).toStrictEqual(defaultSetup)
})

test('Values are read leniently', () => {
  const setup = readSetupQuery(
    '?T=Paddy-Richter&k=f%23&p=3rd&d=7b,%201,1,5&m=PITCH'
  )

  expect(setup.harpStrataProps.tuningId).toBe(TuningIds.PaddyRichter)
  expect(setup.harpStrataProps.harpKeyId).toBe(PitchIds.Gb)
  expect(setup.harpStrataProps.pozitionId).toBe(PozitionIds.Third)
  expect(setup.harpStrataProps.activeIds).toStrictEqual([Root, Fifth, Flat7])
  expect(setup.displayMode).toBe(DisplayModes.Pitch)
})

test('A named scale stands in for degrees, but degrees win when both are given', () => {
  expect(readSetupQuery('s=major-pentatonic').harpStrataProps.activeIds).toStrictEqual(
    [Root, Second, Third, Fifth, Sixth]
  )
  expect(readSetupQuery('s=major-pentatonic&d=1').harpStrataProps.activeIds).toStrictEqual(
    [Root]
  )
})

test('Each bad value falls back to its own default and leaves the rest alone', () => {
  const setup = readSetupQuery('t=no-such-harp&k=H&p=13&d=9,x&m=sideways&v=full')

  expect(setup).toStrictEqual(defaultSetup)
  expect(readSetupQuery('t=country&k=H').harpStrataProps).toStrictEqual({
    ...defaultSetup.harpStrataProps,
    tuningId: TuningIds.Country,
  })
})

test('Unknown keys are ignored, and the first of a repeated key wins', () => {
  expect(readSetupQuery('t=country&creator=x&t=wilde').harpStrataProps.tuningId).toBe(
    TuningIds.Country
  )
})

test('Hostile queries never throw', () => {
  const hostile = [
    '%E0%A4%A',
    't=%',
    '&&&==&=',
    'd=' + '1,'.repeat(5000),
    '__proto__=x&constructor=y&toString=z',
    't=__proto__&k=constructor&s=toString',
  ]
  hostile.forEach((query) =>
    expect(() => readSetupQuery(query)).not.toThrow()
  )
  expect(readSetupQuery('t=__proto__&k=constructor&s=toString')).toStrictEqual(
    defaultSetup
  )
})

test('Only a harpguru.com setup link is read as one', () => {
  expect(readSetupUrl(writeSetupUrl(bluesInA))).toStrictEqual(bluesInA)
  expect(readSetupUrl('https://www.harpguru.com/s?t=country')).toBeDefined()
  expect(readSetupUrl('https://harpguru.com/s/')).toStrictEqual(defaultSetup)

  const refused = [
    'http://harpguru.com/s/?t=country',
    'https://harpguru.com.evil.example/s/?t=country',
    'https://evil.example/https://harpguru.com/s/',
    'https://harpguru.com/s/web?t=country',
    'https://harpguru.com/t/country',
    'https://harpguru.com/e/?t=country',
    'https://harpguru.com/s/?' + 'x'.repeat(2000),
    'not a url',
    '',
  ]
  refused.forEach((url) => expect(readSetupUrl(url)).toBeUndefined())
})
