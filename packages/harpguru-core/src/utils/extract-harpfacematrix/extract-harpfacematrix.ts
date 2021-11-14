import {
  HarpFaceMatrices,
  HarpFaceMatrix,
  isChromaticHarpFace,
} from 'harpparts'

export const extractHarpFaceMatrix = <T>(
  harpfaceMatrices: HarpFaceMatrices<T>,
  harpfaceIndex: 'harpface1' | 'harpface2'
): HarpFaceMatrix<T> => {
  if (harpfaceIndex === 'harpface1') return harpfaceMatrices.harpface1
  if (isChromaticHarpFace(harpfaceMatrices)) return harpfaceMatrices.harpface2

  const errorMessage = `
Attempt to to retrieve harpface2 where not available.
Check you have passed the right index to the function attempting this retrieval.
  `
  throw Error(errorMessage)
}
