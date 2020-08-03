import { useGlobal } from 'reactn'
import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import { MenuContainer } from '../menu-container'
import { AnimatedMenuContainer } from '../animated-menu-container'
import { sizes } from '../../styles'

import { useFlashDisplay } from './utils'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  question: {
    fontSize: sizes['8'],
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
  return (
    <AnimatedMenuContainer onScreen={shouldDisplay}>
      <MenuContainer>
        <View style={styles.view}>
          <Text style={styles.question}>{quizQuestion}</Text>
        </View>
      </MenuContainer>
    </AnimatedMenuContainer>
  )
}
