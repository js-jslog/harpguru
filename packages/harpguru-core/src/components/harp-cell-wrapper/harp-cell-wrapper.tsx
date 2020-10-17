import { useGlobal } from 'reactn'
import React from 'react'
import { IsActiveIds } from 'harpstrata'
import type { DegreeIds } from 'harpstrata'

import { MemoHarpCellInaccessible } from '../harp-cell-inaccessible'
import { MemoHarpCellAccessible } from '../harp-cell-accessible'
import type { Coord } from '../../types'

import { toggleDegreeIdInHarpStrata } from './utils'

export type YXCoord = [Coord, Coord]

type HarpCellProps = {
  readonly yxCoord: YXCoord
}
type ToggleHarpCell = (arg0: DegreeIds) => void

export const HarpCellWrapper = ({
  yxCoord,
}: HarpCellProps): React.ReactElement => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')

  const toggleHarpCell = (): ToggleHarpCell => {
    return (degreeId: DegreeIds) => {
      setActiveHarpStrata(
        toggleDegreeIdInHarpStrata(activeHarpStrata, degreeId)
      )
    }
  }

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
      toggleHarpCell: toggleHarpCell,
    }
    return <MemoHarpCellAccessible {...harpCellAccessibleProps} />
  }
}
