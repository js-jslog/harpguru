import { useGlobal } from 'reactn'

import { useOctaveColumnGroups } from '../use-octave-column-groups'
import type { ColumnRanges } from '../use-octave-column-groups'

export const useOctaveColumnGroupsFragmentAware = (): ColumnRanges => {
  const [fragmentHarpFaceByOctaves] = useGlobal('fragmentHarpFaceByOctaves')
  const octaveColumnGroups = useOctaveColumnGroups()
  if (fragmentHarpFaceByOctaves) return octaveColumnGroups
  return [octaveColumnGroups.flat()]
}
