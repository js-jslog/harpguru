import type { ChromaticHarpFaceFacts, HarpFaceFacts } from './types'

// TODO: rename this function
export const isChromaticHarpFace = <T>(
  props: HarpFaceFacts<T>
): props is ChromaticHarpFaceFacts<T> => {
  return !!(props as ChromaticHarpFaceFacts<T>).harpface2
}
