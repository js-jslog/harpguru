import { extractHarpFaceMatrix } from './extract-harpfacematrix'

const dummyHarpfaceMatrix = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
]
const diatonicHarpFaceMatrices1 = {
  harpface1: [...dummyHarpfaceMatrix],
}
const diatonicHarpFaceMatrices2 = {
  harpface1: [...dummyHarpfaceMatrix],
  harpface2: undefined,
}
const chromaticHarpFaceMatrices = {
  harpface1: [...dummyHarpfaceMatrix],
  harpface2: [...dummyHarpfaceMatrix],
}

test('A harpfacematrix is returned if it exists', () => {
  expect(extractHarpFaceMatrix(diatonicHarpFaceMatrices1, 'harpface1')).toBe(
    diatonicHarpFaceMatrices1.harpface1
  )
  expect(
    extractHarpFaceMatrix(diatonicHarpFaceMatrices1, 'harpface1')
  ).not.toBe(dummyHarpfaceMatrix)
  expect(
    extractHarpFaceMatrix(diatonicHarpFaceMatrices1, 'harpface1')
  ).toStrictEqual(dummyHarpfaceMatrix)
  expect(extractHarpFaceMatrix(diatonicHarpFaceMatrices2, 'harpface1')).toBe(
    diatonicHarpFaceMatrices2.harpface1
  )
  expect(extractHarpFaceMatrix(chromaticHarpFaceMatrices, 'harpface1')).toBe(
    chromaticHarpFaceMatrices.harpface1
  )
  expect(extractHarpFaceMatrix(chromaticHarpFaceMatrices, 'harpface2')).toBe(
    chromaticHarpFaceMatrices.harpface2
  )
  expect(
    extractHarpFaceMatrix(chromaticHarpFaceMatrices, 'harpface2')
  ).not.toBe(chromaticHarpFaceMatrices.harpface1)
})

test('An error is thrown if a harpface doesnt exist', () => {
  expect(() =>
    extractHarpFaceMatrix(diatonicHarpFaceMatrices1, 'harpface2')
  ).toThrow()
  expect(() =>
    extractHarpFaceMatrix(diatonicHarpFaceMatrices2, 'harpface2')
  ).toThrow()
})
