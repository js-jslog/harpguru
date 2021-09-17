import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { HarpStrata } from 'harpstrata'

import { getHarpFaceFacts } from '../utils'
import { useLayoutFacts, useSizes } from '../../../styles'

type HarpFaceStyles = {
  readonly face: ViewStyle
}

export const useStyles = (activeHarpStrata: HarpStrata): HarpFaceStyles => {
  const { dynamicSizes } = useSizes()
  const { columnWidth, rowHeight, fragmentGutter } = dynamicSizes

  const { harpFaceRowCount, harpFaceColumnCount } = useLayoutFacts()

  const { octaveColumnGroups } = getHarpFaceFacts(activeHarpStrata)
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
