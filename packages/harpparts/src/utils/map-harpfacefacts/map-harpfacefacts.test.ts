import { isChromaticHarpFace } from '../../types'

import { mapHarpFaceFacts } from './map-harpfacefacts'

const mapFunction = (original: number, addition: number) => original + addition
const partiallyAppliedMapFunction = (original: number) =>
  mapFunction(original, 1)

test('a simple diatonicfact can be mapped to another diatonicfact', () => {
  const diatonicFact = {
    harpface1: 1,
  }
  const newDiatonicFact = mapHarpFaceFacts(
    diatonicFact,
    partiallyAppliedMapFunction
  )
  expect(isChromaticHarpFace(newDiatonicFact)).toBeFalsy()
  expect(newDiatonicFact.harpface1).toBe(2)
})

test('a simple chromaticfact can be mapped to another chromaticfact', () => {
  const chromaticfact = {
    harpface1: 1,
    harpface2: 2,
  }
  const newChromaticFact = mapHarpFaceFacts(
    chromaticfact,
    partiallyAppliedMapFunction
  )
  expect(isChromaticHarpFace(newChromaticFact)).toBeTruthy()
  expect(newChromaticFact.harpface1).toBe(2)
  const harpface2 = isChromaticHarpFace(newChromaticFact)
    ? newChromaticFact.harpface2
    : 'TOTAL FAILURE'
  expect(harpface2).toBe(3)
})
