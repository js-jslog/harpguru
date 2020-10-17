import { useGlobal } from 'reactn'
import React from 'react'
import { IsActiveIds } from 'harpstrata'

import { HarpCellInaccessible } from '../harp-cell-inaccessible'
import { HarpCellAccessible } from '../harp-cell-accessible'
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
    return <HarpCellInaccessible />
  } else {
    const harpCellAccessibleProps = {
      degreeId: thisDegreeId,
      pitchId: thisPitch,
      isActive: thisIsActiveId === IsActiveIds.Active,
      displayMode: activeDisplayMode,
    }
    return <HarpCellAccessible {...harpCellAccessibleProps} />
  }
}
