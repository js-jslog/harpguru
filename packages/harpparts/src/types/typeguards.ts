import type { HarpFaceMatricesChromatic, HarpFaceMatrices } from './types'

export const isChromaticHarpFace = <T>(
  props: HarpFaceMatrices<T>
): props is HarpFaceMatricesChromatic<T> => {
  return !!(props as HarpFaceMatricesChromatic<T>).harpface2
}
