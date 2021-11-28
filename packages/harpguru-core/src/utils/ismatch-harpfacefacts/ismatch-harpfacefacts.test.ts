import { isMatchHarpFaceFacts } from './ismatch-harpfacefacts'

test('simple matching diatonic & chromatic harpface facts return true', () => {
  const diatonicfacts1 = {
    harpface1: 1,
  }
  const diatonicfacts2 = {
    harpface1: 1,
  }
  const chromaticfacts1 = {
    harpface1: 1,
    harpface2: 2,
  }
  const chromaticfacts2 = {
    harpface1: 1,
    harpface2: 2,
  }
  const isMatchFunction = (factpart1: number, factpart2: number) =>
    factpart1 === factpart2
  expect(
    isMatchHarpFaceFacts(isMatchFunction, diatonicfacts1, diatonicfacts2)
  ).toBeTruthy()
  expect(
    isMatchHarpFaceFacts(isMatchFunction, diatonicfacts2, diatonicfacts1)
  ).toBeTruthy()
  expect(
    isMatchHarpFaceFacts(isMatchFunction, chromaticfacts1, chromaticfacts2)
  ).toBeTruthy()
  expect(
    isMatchHarpFaceFacts(isMatchFunction, chromaticfacts2, chromaticfacts1)
  ).toBeTruthy()
})

test('simple non-matching diatonic & chromatic harpface facts return true', () => {
  const diatonicfacts1 = {
    harpface1: 1,
  }
  const diatonicfacts2 = {
    harpface1: 2,
  }
  const chromaticfacts1 = {
    harpface1: 1,
    harpface2: 1,
  }
  const chromaticfacts2 = {
    harpface1: 1,
    harpface2: 2,
  }
  const chromaticfact3 = {
    harpface1: 2,
    harpface2: 1,
  }
  const isMatchFunction = (factpart1: number, factpart2: number) =>
    factpart1 === factpart2
  expect(
    isMatchHarpFaceFacts(isMatchFunction, diatonicfacts1, diatonicfacts2)
  ).toBeFalsy()
  expect(
    isMatchHarpFaceFacts(isMatchFunction, diatonicfacts2, diatonicfacts1)
  ).toBeFalsy()
  expect(
    isMatchHarpFaceFacts(isMatchFunction, chromaticfacts1, chromaticfacts2)
  ).toBeFalsy()
  expect(
    isMatchHarpFaceFacts(isMatchFunction, chromaticfacts2, chromaticfacts1)
  ).toBeFalsy()
  expect(
    isMatchHarpFaceFacts(isMatchFunction, chromaticfacts1, chromaticfact3)
  ).toBeFalsy()
  expect(
    isMatchHarpFaceFacts(isMatchFunction, chromaticfact3, chromaticfacts1)
  ).toBeFalsy()
  expect(
    isMatchHarpFaceFacts(isMatchFunction, chromaticfacts2, chromaticfact3)
  ).toBeFalsy()
  expect(
    isMatchHarpFaceFacts(isMatchFunction, chromaticfact3, chromaticfacts2)
  ).toBeFalsy()
})

test('diatonic and chromatic harpfacefacts are not a match', () => {
  const diatonicfacts1 = {
    harpface1: 1,
  }
  const chromaticfacts1 = {
    harpface1: 1,
    harpface2: 1,
  }
  const isMatchFunction = (factpart1: number, factpart2: number) =>
    factpart1 === factpart2
  expect(
    isMatchHarpFaceFacts(isMatchFunction, diatonicfacts1, chromaticfacts1)
  ).toBeFalsy()
  expect(
    isMatchHarpFaceFacts(isMatchFunction, chromaticfacts1, diatonicfacts1)
  ).toBeFalsy()
})
