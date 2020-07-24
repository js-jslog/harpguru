import { useGlobal, useDispatch } from 'reactn'
import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
  LongPressGestureHandler,
} from 'react-native-gesture-handler'
import { Text, View } from 'react-native'
import React from 'react'

import { HarpCellProps } from '../types'
import { toggleDegreeIdInHarpStrata } from '../toggleDegreeIdInHarpStrata'
import { getStyles } from '../styles'
import { setPozitionRootAtCell } from '../setPozitionRootAtCell'
import { getDisplayValue } from '../getDisplayValue'
import { ensureCellIsActive } from '../ensureCellIsActive'
import { analysePosition } from '../analysePosition'
import { ExperienceModes } from '../../../helpers/setGlobalReactNState'

export const HarpCell = (props: HarpCellProps): React.ReactElement => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const [quizQuestion] = useGlobal('quizQuestion')
  const harpCellProps = {
    ...props,
    activeHarpStrata,
    setActiveHarpStrata,
    activeExperienceMode,
  }
  const { activeDisplayMode } = props
  const positionFacts = analysePosition(harpCellProps)
  const { thisDegree, thisPitch } = positionFacts
  const { id: degreeId } = thisDegree || { id: undefined }
  const { id: pitchId } = thisPitch || { id: undefined }

  const quizAnswerGiven = useDispatch('quizAnswerGiven')

  const displayValue = getDisplayValue(harpCellProps)

  const styles = getStyles(harpCellProps)

  const handleTapStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state !== State.END) return
    if (degreeId === undefined) return

    const withUserSelectionUpdated = toggleDegreeIdInHarpStrata(
      activeHarpStrata,
      degreeId
    )
    setActiveHarpStrata(withUserSelectionUpdated)
    if (activeExperienceMode === ExperienceModes.Quiz) {
      setActiveHarpStrata(
        ensureCellIsActive({
          harpStrata: withUserSelectionUpdated,
          cellId: quizQuestion,
        })
      )
      quizAnswerGiven(activeDisplayMode)
    }
  }

  const handleLongPressStateChange = ({
    nativeEvent,
  }: TapGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state !== State.ACTIVE) return
    if (pitchId === undefined) return

    setActiveHarpStrata(setPozitionRootAtCell(activeHarpStrata, pitchId))
  }

  const accessibleContent = (
    <LongPressGestureHandler onHandlerStateChange={handleLongPressStateChange}>
      <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
        <View accessible={true} accessibilityRole="button" style={styles.cell}>
          <Text style={styles.note}>{displayValue[0]}</Text>
          <Text style={styles.modifier}>{displayValue[1]}</Text>
        </View>
      </TapGestureHandler>
    </LongPressGestureHandler>
  )

  const inAccessibleContent = (
    <View accessible={false} style={styles.cell}>
      <View style={styles.cell} />
    </View>
  )

  const content =
    thisDegree === undefined ? inAccessibleContent : accessibleContent

  return content
}
