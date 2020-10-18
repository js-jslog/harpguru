import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { IsActiveIds } from 'harpstrata'
import type { DegreeIds, HarpStrata } from 'harpstrata'

import { MemoHarpCellInaccessible } from '../harp-cell-inaccessible'
import { MemoHarpCellAccessible } from '../harp-cell-accessible'
import type { Coord, DisplayModes, ExperienceModes } from '../../types'
import type { SizeScheme } from '../../styles'

import { toggleDegreeIdInHarpStrata } from './utils'

export type YXCoord = [Coord, Coord]

type HarpCellProps = {
  readonly yxCoord: YXCoord
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: (arg0: HarpStrata) => void
  readonly activeDisplayMode: DisplayModes
  readonly activeExperienceMode: ExperienceModes
  readonly sizes: SizeScheme
}

export const HarpCellWrapper = ({
  yxCoord,
  activeHarpStrata,
  setActiveHarpStrata,
  activeDisplayMode,
  activeExperienceMode,
  sizes,
}: HarpCellProps): React.ReactElement => {
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
      sizes: sizes,
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
