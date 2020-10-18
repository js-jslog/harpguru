import { useGlobal } from 'reactn'
import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { IsActiveIds } from 'harpstrata'
import type { DegreeIds } from 'harpstrata'

import { MemoHarpCellInaccessible } from '../harp-cell-inaccessible'
import { MemoHarpCellAccessible } from '../harp-cell-accessible'
import type { Coord, DisplayModes, ExperienceModes } from '../../types'

import { toggleDegreeIdInHarpStrata } from './utils'

export type YXCoord = [Coord, Coord]

type HarpCellProps = {
  readonly yxCoord: YXCoord
  readonly activeDisplayMode: DisplayModes
  readonly activeExperienceMode: ExperienceModes
}

export const HarpCellWrapper = ({
  yxCoord,
  activeDisplayMode,
  activeExperienceMode,
}: HarpCellProps): React.ReactElement => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')

  const toggleHarpCell = (degreeId: DegreeIds): void => {
    setActiveHarpStrata(toggleDegreeIdInHarpStrata(activeHarpStrata, degreeId))
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
      activeExperienceMode: activeExperienceMode,
    }
    const handleTapStateChange = ({
      nativeEvent,
    }: TapGestureHandlerStateChangeEvent) => {
      if (nativeEvent.state !== State.END) return

      toggleHarpCell(thisDegreeId)
    }

    return (
      <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
        <View>
          <MemoHarpCellAccessible {...harpCellAccessibleProps} />
        </View>
      </TapGestureHandler>
    )
  }
}
