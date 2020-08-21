import { useGlobal } from 'reactn'
import { isNaturalPitch } from 'harpstrata'

import { usePositionAnalysis } from '../use-position-analysis'
import type { YXCoord } from '../../harp-cell'
import { DisplayModes } from '../../../../types'

type DisplayValueTuple =
  | [string, string]
  | [string, undefined]
  | [undefined, undefined]

type DisplayValues = ReadonlyArray<DisplayValueTuple>

export const useDisplayValue = (yxCoord: YXCoord): DisplayValues => {
  const [activeDisplayMode] = useGlobal('activeDisplayMode')

  const { thisDegree, thisPitch } = usePositionAnalysis(yxCoord)

  if (thisDegree === undefined || thisPitch === undefined)
    return [[undefined, undefined]]

  if (activeDisplayMode === DisplayModes.Degree) {
    const [note, ...modifiers] = thisDegree.id.split('')

    return [[note, modifiers.join('')]]
  }

  if (isNaturalPitch(thisPitch)) {
    const {
      contextualDisplayValues: { natural },
    } = thisPitch
    return [[natural, undefined]]
  }

  const {
    contextualDisplayValues: { sharp, flat },
  } = thisPitch
  return [
    [sharp, '#'],
    [flat, 'b'],
  ]
}
