import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

import { extractHarpFaceFacts } from '../../../utils'
import { useHarpGuruStore } from '../../../store'

import { useOctaveColumnGroups } from './use-octave-column-groups'

type HarpFaceStyles = {
  readonly face: ViewStyle
}

export const useStyles = (
  harpfaceIndex: 'harpface1' | 'harpface2'
): HarpFaceStyles => {
  const dynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
  const { columnWidth, rowHeight, fragmentGutter } = dynamicSizes

  const layoutFacts = useHarpGuruStore((state) => state.layoutFacts)
  const { harpfaceRows, harpfaceColumns } = extractHarpFaceFacts(
    layoutFacts,
    harpfaceIndex
  )

  const octaveColumnGroups = useOctaveColumnGroups()
  const { length: groupCount } = octaveColumnGroups

  const styles = StyleSheet.create({
    face: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: columnWidth * harpfaceColumns + (fragmentGutter * groupCount + 1),
      height: rowHeight * harpfaceRows,
      left: dynamicSizes.zoomSlideWidth / 2,
    },
  })

  return styles
}
