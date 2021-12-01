import { useGlobal } from 'reactn'

import { useOctaveColumnGroups } from '../use-octave-column-groups'
import type { ColumnRanges } from '../use-octave-column-groups'

export const useOctaveColumnGroupsFragmentAware = (
  harpfaceIndex: 'harpface1' | 'harpface2'
): ColumnRanges => {
  const [fragmentHarpFaceByOctaves] = useGlobal('fragmentHarpFaceByOctaves')
  const octaveColumnGroups = useOctaveColumnGroups(harpfaceIndex)
  if (fragmentHarpFaceByOctaves) return octaveColumnGroups
  return [octaveColumnGroups.flat()]
}
