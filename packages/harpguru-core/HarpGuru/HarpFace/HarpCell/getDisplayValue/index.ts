import type { HarpStrata } from 'harpstrata'

import { HarpCellProps } from '../types'
import { analysePosition } from '../analysePosition'
import { DisplayModes } from '../../../types'

type DisplayValueTuple =
  | [string, string]
  | [string, undefined]
  | [undefined, undefined]

type Props = HarpCellProps & {
  readonly activeHarpStrata: HarpStrata
  readonly activeDisplayMode: DisplayModes
}

export const getDisplayValue = (props: Props): DisplayValueTuple => {
  const positionFacts = analysePosition(props)
  const { activeDisplayMode } = props
  const { thisDegree, thisPitch } = positionFacts
  const { id: degreeId } = thisDegree || { id: undefined }
  const { id: pitchId } = thisPitch || { id: undefined }

  if (degreeId === undefined || pitchId === undefined)
    return [undefined, undefined]

  const [note, ...modifiers] =
    activeDisplayMode === DisplayModes.Degree
      ? degreeId.split('')
      : pitchId.split('')

  return [note, modifiers.join('')]
}
