import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import React from 'react'

import { colors } from '../../styles'
import { sizes } from '../../styles'

import { useFlashDisplay } from './utils'

const styles = StyleSheet.create({
  animated: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    backgroundColor: colors.pageColor,
    opacity: 0.7,
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
  },
  text: {
    fontSize: sizes['10'],
  },
})

type QuizQuestionDisplayProps = {
  readonly screenFree: boolean
}

export const QuizQuestionDisplay = ({
  screenFree,
}: QuizQuestionDisplayProps): React.ReactElement => {
  const [quizQuestion] = useGlobal('quizQuestion')
  const shouldDisplay = useFlashDisplay(screenFree)

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
  const guaranteeOffScreenWidth =
    windowWidth > windowHeight ? windowWidth : windowHeight
  const translateX = shouldDisplay ? 0 : guaranteeOffScreenWidth
  return (
    <Animated.View
      style={[
        styles.animated,
        {
          transform: [{ translateX: translateX }],
        },
      ]}
    >
      <View style={styles.overlay}>
        <View style={styles.mainContents}>
          <View style={styles.question}>
            <Text style={styles.text}>{quizQuestion}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  )
}
