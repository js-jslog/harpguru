import { isChromaticHarpFace } from 'harpparts'
import type { HarpFaceFacts } from 'harpparts'

export const isMatchHarpFaceFacts = <T>(
  isMatchFunction: (arg0: T, arg1: T) => boolean,
  facts1: HarpFaceFacts<T>,
  facts2: HarpFaceFacts<T>
): boolean => {
  const { harpface1: harpface1_1 } = facts1
  const { harpface1: harpface2_1 } = facts2
  if (isChromaticHarpFace(facts1) && isChromaticHarpFace(facts2)) {
    const { harpface2: harpface1_2 } = facts1
    const { harpface2: harpface2_2 } = facts2
    return (
      isMatchFunction(harpface1_1, harpface2_1) &&
      isMatchFunction(harpface1_2, harpface2_2)
    )
  } else if (isChromaticHarpFace(facts1) || isChromaticHarpFace(facts2))
    return false
  return isMatchFunction(harpface1_1, harpface2_1)
}
