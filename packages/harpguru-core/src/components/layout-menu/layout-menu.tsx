import { useGlobal } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import Animated, { Easing, interpolate, add } from 'react-native-reanimated'
import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { getApparatusIds } from 'harpstrata'
import { Entypo } from '@expo/vector-icons'

import { Option } from '../option'
import { MenuOpenButton } from '../menu-open-button'
import { MenuCloseButton } from '../menu-close-button'
import { getMenuStylesAndAnimationVals } from '../../utils'
import {
  MenuProps,
  OptionIds,
  ExperienceModes,
  DisplayModes,
} from '../../types'
import { getSizes, colors } from '../../styles'
import { useNudgeDisplayMode, usePrevious } from '../../hooks'

import {
  useNudgeHarpStrataByApparatus,
  useNudgeExperienceMode,
  useSetHarpStrataByApparatus,
} from './hooks'

export const LayoutMenu = ({
  hideMenu,
  hideLabel,
  openCloseTapHandler,
}: MenuProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const nudgeHarpStrataByApparatus = useNudgeHarpStrataByApparatus()
  const setHarpStrataByApparatus = useSetHarpStrataByApparatus()
  const {
    apparatus: { id: apparatusId },
  } = activeHarpStrata
  const apparatusOptionProps = {
    title: 'Tuning',
    activeOptionId: apparatusId,
    orderedOptionIds: getApparatusIds(),
    nudgeFunction: nudgeHarpStrataByApparatus,
    setFunction: setHarpStrataByApparatus as (arg0: OptionIds) => void,
  }

  const [activeExperienceMode, setActiveExperienceMode] = useGlobal(
    'activeExperienceMode'
  )
  const nudgeExperienceMode = useNudgeExperienceMode()
  const experienceModeOptionProps = {
    title: 'Experience',
    activeOptionId: activeExperienceMode,
    orderedOptionIds: [ExperienceModes.Quiz, ExperienceModes.Explore],
    nudgeFunction: nudgeExperienceMode,
    setFunction: setActiveExperienceMode as (arg0: OptionIds) => void,
  }

  const [activeDisplayMode, setActiveDisplayMode] = useGlobal(
    'activeDisplayMode'
  )
  const nudgeDisplayMode = useNudgeDisplayMode()
  const displayModeOptionProps = {
    title: 'Display',
    activeOptionId: activeDisplayMode,
    orderedOptionIds: [DisplayModes.Pitch, DisplayModes.Degree],
    nudgeFunction: nudgeDisplayMode,
    setFunction: setActiveDisplayMode as (arg0: OptionIds) => void,
  }

  const [isTapped, setIsTapped] = React.useState(false)
  const changedTap = isTapped !== usePrevious(isTapped, isTapped)
  const labelTapTransitionValue = useTimingTransition(isTapped, {
    duration: 100,
    easing: Easing.inOut(Easing.circle),
  })
  const labelTapAnimationValue = interpolate(labelTapTransitionValue, {
    inputRange: [0, 1],
    outputRange: isTapped ? [1, 5] : [1, 5],
  })
  const handleTapStateChange = (event: TapGestureHandlerStateChangeEvent) => {
    const { nativeEvent } = event
    if (nativeEvent.state === State.BEGAN) setIsTapped(true)
    if ([State.FAILED, State.CANCELLED].includes(nativeEvent.state))
      setIsTapped(false)
    if (nativeEvent.state === State.END) setIsTapped(false)
  }

  React.useEffect(() => {
    const postAnimation = setTimeout(() => {
      if (changedTap === false) return
      setIsTapped(false)
      openCloseTapHandler()
    }, 100)
    return () => {
      clearTimeout(postAnimation)
    }
  }, [changedTap, setIsTapped])

  const {
    styles,
    menuSlideXTranslation,
    menuSlideYTranslation,
    menuScale,
    menuBackgroundColor,
    menuOpacity,
    labelCounterScale,
  } = getMenuStylesAndAnimationVals(hideMenu, hideLabel, 'BOTTOM')

  const totalLabelScale = add(labelTapAnimationValue, labelCounterScale)

  const sizes = getSizes()

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          transform: [
            { translateX: menuSlideXTranslation },
            { translateY: menuSlideYTranslation },
            { scale: menuScale },
          ],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: menuBackgroundColor,
            opacity: menuOpacity,
          },
        ]}
      >
        <View style={styles.mainContents}>
          <Option {...apparatusOptionProps} />
          <Option {...displayModeOptionProps} />
          <Option {...experienceModeOptionProps} />
          <MenuCloseButton openCloseTapHandler={openCloseTapHandler} />
        </View>
        <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
          <View style={styles.label}>
            <MenuOpenButton scaleValue={totalLabelScale}>
              <Entypo
                name="cog"
                size={sizes['7']}
                color={colors.inertOutline}
              />
            </MenuOpenButton>
          </View>
        </TapGestureHandler>
      </Animated.View>
    </Animated.View>
  )
}
