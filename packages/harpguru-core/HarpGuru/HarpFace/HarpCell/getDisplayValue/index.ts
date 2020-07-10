import { HarpCellProps } from '../types'
import { analysePosition } from '../analysePosition'
import { DisplayModes } from '../../types'

export const getDisplayValue = (props: HarpCellProps): string | undefined => {
  const positionFacts = analysePosition(props)
  const { activeDisplayMode } = props
  const { thisDegree, thisPitch } = positionFacts
  const { id: degreeId } = thisDegree || { id: undefined }
  const { id: pitchId } = thisPitch || { id: undefined }

  const displayValue =
    activeDisplayMode === DisplayModes.Degree ? degreeId : pitchId

  return displayValue
}
