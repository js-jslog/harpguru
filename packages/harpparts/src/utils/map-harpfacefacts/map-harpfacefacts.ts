import { isChromaticHarpFace } from '../../types'
import type { HarpFaceFacts } from '../../types'

export const mapHarpFaceFacts = <T, K>(
  harpFaceFacts: HarpFaceFacts<T>,
  mapFunction: (arg0: T) => K
): HarpFaceFacts<K> => {
  const harpface1 = mapFunction(harpFaceFacts.harpface1)
  if (isChromaticHarpFace(harpFaceFacts)) {
    const harpface2 = mapFunction(harpFaceFacts.harpface2)
    return {
      harpface1,
      harpface2,
    }
  }
  return { harpface1 }
}
