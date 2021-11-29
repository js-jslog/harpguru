import type { ChromaticHarpFaceFacts, HarpFaceFacts } from './types'

export const isChromaticHarpFace = <T>(
  props: HarpFaceFacts<T>
): props is ChromaticHarpFaceFacts<T> => {
  return !!(props as ChromaticHarpFaceFacts<T>).harpface2
}
