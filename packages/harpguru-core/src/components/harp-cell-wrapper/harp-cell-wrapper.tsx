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
import type { Coord } from '../../types'
import { getSizes } from '../../styles'

import { toggleDegreeIdInHarpStrata } from './utils'

export type YXCoord = [Coord, Coord]

type HarpCellProps = {
  readonly yxCoord: YXCoord
}

export const HarpCellWrapper = ({
  yxCoord,
}: HarpCellProps): React.ReactElement => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const sizes = getSizes()
  const toggleHarpCell = (degreeId: DegreeIds): void => {
    setActiveHarpStrata(toggleDegreeIdInHarpStrata(activeHarpStrata, degreeId))
  }
  const [isTouched, setIsTouched] = React.useState(false)

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
      isTouched,
    }
    const handleTapStateChange = ({
      nativeEvent,
    }: TapGestureHandlerStateChangeEvent) => {
      if (nativeEvent.state === State.BEGAN) {
        setIsTouched(true)
      }
      if (nativeEvent.state !== State.END) return

      toggleHarpCell(thisDegreeId)
    }

    React.useEffect(() => {
      const hideQuestionTimer = setTimeout(() => {
        setIsTouched(false)
      }, 300)
      return () => {
        clearTimeout(hideQuestionTimer)
      }
    }, [isTouched])

    return (
      <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
        <View>
          <MemoHarpCellAccessible {...harpCellAccessibleProps} />
        </View>
      </TapGestureHandler>
    )
  }
}
