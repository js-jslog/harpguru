import { useGlobal } from 'reactn'
import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

import { useSizes } from '../../../hooks'

import { useOctaveColumnGroups } from './use-octave-column-groups'

type HarpFaceStyles = {
  readonly face: ViewStyle
}

export const useStyles = (
  harpfaceIndex: 'harpface1' | 'harpface2'
): HarpFaceStyles => {
  const { dynamicSizes } = useSizes()
  const { columnWidth, rowHeight, fragmentGutter } = dynamicSizes

  const [layoutFacts] = useGlobal('layoutFacts')
  const {
    [harpfaceIndex === 'harpface1' ? 0 : 1]: { harpfaceRows, harpfaceColumns },
  } = layoutFacts

  // TODO: Should we perhaps just make useOctaveColumnGroups always use
  // harpface1 rather than requiring that it be passed
  const octaveColumnGroups = useOctaveColumnGroups('harpface1')
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
