import { View } from 'react-native'
import React, { ReactNode, ReactElement } from 'react'

import { styles } from '../../styles'

export const MenuContainer = ({children}: {readonly children: ReactNode}): ReactElement => {
  return (
    <View style={styles.menuContainer}>
      { children }
    </View>
  )
}
