import { isChromaticHarpFace } from './typeguards'

const dummyHarpfaceMatrix = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
]

test('isChromaticHarpFace returns false for a diatonic (single matix) harp face matrices', () => {
  const diatonicHarpFaceMatrices = {
    harpface1: dummyHarpfaceMatrix,
  }

  expect(isChromaticHarpFace(diatonicHarpFaceMatrices)).toBeFalsy()
})

test('isChromaticHarpFace returns true for a chromatic (double matrix) harp face matrices', () => {
  const chromaticHarpFaceMatrices = {
    harpface1: dummyHarpfaceMatrix,
    harpface2: dummyHarpfaceMatrix,
  }

  expect(isChromaticHarpFace(chromaticHarpFaceMatrices)).toBeTruthy()
})
