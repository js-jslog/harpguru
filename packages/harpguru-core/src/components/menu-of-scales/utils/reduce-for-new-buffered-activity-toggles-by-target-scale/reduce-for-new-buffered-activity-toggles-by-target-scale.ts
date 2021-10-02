import type { DegreeIds } from 'harpparts'

import { rebufferForInput } from '../rebuffer-for-input'

export const reduceForNewBufferedActivityTogglesByTargetScale = (
  _bufferedActivityToggles: ReadonlyArray<DegreeIds>,
  activeDegreeIds: ReadonlyArray<DegreeIds>,
  targetScale: ReadonlyArray<DegreeIds>
): ReadonlyArray<DegreeIds> => {
  const bufferedActivityToggles = rebufferForInput(activeDegreeIds, targetScale)
  return bufferedActivityToggles
}
