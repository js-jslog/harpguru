import { isChromaticHarpFace } from '../../types'
import type { HarpFaceFacts } from '../../types'

export const mapHarpFaceFacts = <T, K, L>(
  harpFaceFacts: HarpFaceFacts<T>,
  mapFunction: (arg0: T, arg1: K) => L,
  mapFunctionSupportParams: K
): HarpFaceFacts<L> => {
  const harpface1 = mapFunction(
    harpFaceFacts.harpface1,
    mapFunctionSupportParams
  )
  if (isChromaticHarpFace(harpFaceFacts)) {
    const harpface2 = mapFunction(
      harpFaceFacts.harpface2,
      mapFunctionSupportParams
    )
    return {
      harpface1,
      harpface2,
    }
  }
  return { harpface1 }
}
