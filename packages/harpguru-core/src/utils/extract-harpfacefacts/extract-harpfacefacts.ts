import { HarpFaceFacts, isChromaticHarpFace } from 'harpparts'

export const extractHarpFaceFacts = <T>(
  harpfaceFacts: HarpFaceFacts<T>,
  harpfaceIndex: 'harpface1' | 'harpface2'
): T => {
  if (harpfaceIndex === 'harpface1') return harpfaceFacts.harpface1
  if (isChromaticHarpFace(harpfaceFacts)) return harpfaceFacts.harpface2

  const errorMessage = `
Attempt to to retrieve harpface2 where not available.
Check you have passed the right index to the function attempting this retrieval.
  `
  throw Error(errorMessage)
}
