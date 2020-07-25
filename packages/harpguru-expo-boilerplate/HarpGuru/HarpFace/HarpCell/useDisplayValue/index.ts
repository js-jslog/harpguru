import { useGlobal } from 'reactn'

import { usePositionAnalysis } from '../usePositionAnalysis'
import type { YXCoord } from '../types'
import { DisplayModes } from '../../../types'

type DisplayValueTuple =
  | [string, string]
  | [string, undefined]
  | [undefined, undefined]

export const useDisplayValue = (yxCoord: YXCoord): DisplayValueTuple => {
  const [activeDisplayMode] = useGlobal('activeDisplayMode')

  const { thisDegreeId, thisPitchId } = usePositionAnalysis(yxCoord)

  if (thisDegreeId === undefined || thisPitchId === undefined)
    return [undefined, undefined]

  const [note, ...modifiers] =
    activeDisplayMode === DisplayModes.Degree
      ? thisDegreeId.split('')
      : thisPitchId.split('')

  return [note, modifiers.join('')]
}
