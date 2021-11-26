import type { ChromaticHarpFaceFact, HarpFaceFact } from './types'

// TODO: rename this function
export const isChromaticHarpFace = <T>(
  props: HarpFaceFact<T>
): props is ChromaticHarpFaceFact<T> => {
  return !!(props as ChromaticHarpFaceFact<T>).harpface2
}
