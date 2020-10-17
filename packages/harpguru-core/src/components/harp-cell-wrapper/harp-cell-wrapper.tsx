import { useGlobal } from 'reactn'
import React from 'react'
import { IsActiveIds } from 'harpstrata'

import { MemoHarpCellInaccessible } from '../harp-cell-inaccessible'
import { MemoHarpCellAccessible } from '../harp-cell-accessible'
import type { Coord } from '../../types'

export type YXCoord = [Coord, Coord]

type HarpCellProps = {
  readonly yxCoord: YXCoord
}

export const HarpCellWrapper = ({
  yxCoord,
}: HarpCellProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')

  const {
    degreeMatrix,
    pitchMatrix,
    isActiveComplex: { isActiveMatrix },
  } = activeHarpStrata
  const [yCoord, xCoord] = yxCoord
  const {
    [yCoord]: { [xCoord]: thisDegree },
  } = degreeMatrix
  const {
    [yCoord]: { [xCoord]: thisPitch },
  } = pitchMatrix
  const {
    [yCoord]: { [xCoord]: thisIsActiveId },
  } = isActiveMatrix
  const { id: thisDegreeId } = thisDegree || { id: undefined }
  const { id: thisPitchId } = thisPitch || { id: undefined }

  if (thisDegreeId === undefined || thisPitchId === undefined) {
    return <MemoHarpCellInaccessible />
  } else {
    const harpCellAccessibleProps = {
      degreeId: thisDegreeId,
      pitchId: thisPitchId,
      isActive: thisIsActiveId === IsActiveIds.Active,
      displayMode: activeDisplayMode,
    }
    return <MemoHarpCellAccessible {...harpCellAccessibleProps} />
  }
}
