import { useGlobal } from 'reactn'
import Animated, {
  interpolate,
  cond,
  greaterThan,
} from 'react-native-reanimated'
import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'

import { RenderedTone } from '../rendered-tone'
import { getRenderableToneTuples } from '../../utils'
import type { RenderableToneTuples } from '../../types'
import { getSizes, colors } from '../../styles'

import { useFlashDisplay } from './hooks'

type QuizQuestionDisplayProps = {
  readonly screenFree: boolean
}

export const QuizQuestionDisplay = ({
  screenFree,
}: QuizQuestionDisplayProps): React.ReactElement => {
  const [quizQuestion] = useGlobal('quizQuestion')
  const [activeExperienceMode] = useGlobal('activeExperienceMode')
  const flashAnimationValue = useFlashDisplay(screenFree)

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const guaranteeOffScreenWidth =
    windowWidth > windowHeight ? windowWidth : windowHeight

  const sizes = getSizes()
  const { overlayOpacity } = sizes

  const displayOpacity = interpolate(flashAnimationValue, {
    inputRange: [0, 1],
    outputRange: [0, overlayOpacity],
  })
  const translateX = cond(
    greaterThan(flashAnimationValue, 0),
    0,
    guaranteeOffScreenWidth
  )
  const toneTuples = getRenderableToneTuples(quizQuestion)

  const selectToneVersionForDisplay = (
    toneTuples: RenderableToneTuples
  ): RenderableToneTuples => {
    if (toneTuples.length === 1) return toneTuples

    const random = Math.floor(Math.random() * 2)

    if (random === 0) return [toneTuples[0]]
    return [toneTuples[1]]
  }

  const styles = StyleSheet.create({
    animated: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      backgroundColor: colors.pageColor,
    },
    mainContents: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
    },
    question: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      transform: [{ scale: sizes['5'] }],
    },
  })

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          transform: [{ translateX: translateX }],
          opacity: displayOpacity,
        },
      ]}
    >
      <View style={styles.overlay}>
        <View style={styles.mainContents}>
          <View style={styles.question}>
            <RenderedTone
              toneTuples={selectToneVersionForDisplay(toneTuples)}
              isActive={false}
              isQuestion={true}
              splitType={'FLAT'}
              activeExperienceMode={activeExperienceMode}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  )
}
