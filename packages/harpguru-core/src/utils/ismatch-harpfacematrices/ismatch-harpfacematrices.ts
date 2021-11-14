import { isChromaticHarpFace } from 'harpparts'
import type { HarpFaceMatrices, HarpFaceMatrix } from 'harpparts'

// TODO: This could use a test file
export const isMatchHarpFaceMatrices = <T>(
  isMatchFunction: (
    arg0: HarpFaceMatrix<T>,
    arg1: HarpFaceMatrix<T>
  ) => boolean,
  matrices1: HarpFaceMatrices<T>,
  matrices2: HarpFaceMatrices<T>
): boolean => {
  const { harpface1: harpface1_1 } = matrices1
  const { harpface1: harpface2_1 } = matrices2
  if (isChromaticHarpFace(matrices1) && isChromaticHarpFace(matrices2)) {
    const { harpface2: harpface2_1 } = matrices1
    const { harpface2: harpface2_2 } = matrices2
    return (
      isMatchFunction(harpface1_1, harpface2_1) &&
      isMatchFunction(harpface2_1, harpface2_2)
    )
  } else if (isChromaticHarpFace(matrices1) || isChromaticHarpFace(matrices2))
    return false
  return isMatchFunction(harpface1_1, harpface2_1)
}
