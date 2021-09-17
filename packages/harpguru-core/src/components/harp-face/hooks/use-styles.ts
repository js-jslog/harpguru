import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

import { useLayoutFacts, useSizes } from '../../../styles'

import { useOctaveColumnGroups } from './use-octave-column-groups'

type HarpFaceStyles = {
  readonly face: ViewStyle
}

export const useStyles = (): HarpFaceStyles => {
  const { dynamicSizes } = useSizes()
  const { columnWidth, rowHeight, fragmentGutter } = dynamicSizes

  const { harpFaceRowCount, harpFaceColumnCount } = useLayoutFacts()

  const octaveColumnGroups = useOctaveColumnGroups()
  const { length: groupCount } = octaveColumnGroups

  const styles = StyleSheet.create({
    face: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width:
        columnWidth * harpFaceColumnCount + (fragmentGutter * groupCount + 1),
      height: rowHeight * harpFaceRowCount,
    },
  })

  return styles
}
