import { HarpCellProps } from '../types'
import { analysePosition } from '../analysePosition'
import { DisplayModes } from '../../../types'

type DisplayValueTuple =
  | [string, string]
  | [string, undefined]
  | [undefined, undefined]

export const getDisplayValue = (props: HarpCellProps): DisplayValueTuple => {
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
