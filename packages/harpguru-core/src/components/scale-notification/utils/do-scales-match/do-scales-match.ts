import { DegreeIds } from 'harpparts'

import { doesArrayContainAllElements } from '../does-array-contain-all-elements'

export const doScalesMatch = (
  scale1: ReadonlyArray<DegreeIds>,
  scale2: ReadonlyArray<DegreeIds>
): boolean => {
  const scale1Matches = doesArrayContainAllElements(scale1, scale2)
  const scale2Matches = doesArrayContainAllElements(scale2, scale1)

  return scale1Matches && scale2Matches
}
