import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement, ReactNode } from 'react'

import { colors } from './styles'

type ChoiceProps = {
  readonly isChosen: boolean
  readonly onPress: () => void
  readonly children: ReactNode
  readonly style?: object
}

// A control that is one of a set. Chosen is the app's pink, with a border as
// well: the fill alone is too faint against the page. Every choice has a
// border of the same width, so choosing one moves nothing.
export const Choice = ({
  isChosen,
  onPress,
  children,
  style,
}: ChoiceProps): ReactElement => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityState={{ selected: isChosen }}
    style={[styles.choice, isChosen && styles.chosen, style]}
  >
    {children}
  </Pressable>
)

const styles = StyleSheet.create({
  choice: {
    borderWidth: 2,
    borderColor: colors.rule,
    borderRadius: 6,
    backgroundColor: colors.page,
  },
  chosen: {
    backgroundColor: colors.chosen,
    borderColor: colors.quiet,
  },
})
