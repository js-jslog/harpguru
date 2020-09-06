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
import { colors } from '../../styles'
import { getSizes } from '../../styles'

import { useFlashDisplay } from './hooks'

type QuizQuestionDisplayProps = {
  readonly screenFree: boolean
}

export const QuizQuestionDisplay = ({
  screenFree,
}: QuizQuestionDisplayProps): React.ReactElement => {
  const [quizQuestion] = useGlobal('quizQuestion')
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
  console.log(toneTuples)

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
              toneTuples={toneTuples}
              isActive={false}
              isQuestion={true}
              splitType={'FLAT'}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  )
}
