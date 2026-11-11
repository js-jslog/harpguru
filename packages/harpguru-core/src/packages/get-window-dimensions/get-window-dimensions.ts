import { Dimensions, Platform } from 'react-native'

import type { FrameDimensions } from '../../types'

type ReturnObject = {
  readonly longEdge: number
  readonly shortEdge: number
}

// The harp face always lies along the long edge. The app is locked to
// landscape, so on a device the long edge is the horizontal one, and taking
// the longer of the two keeps a portrait reading at launch from sizing it
// wrongly. A browser window can be any shape, a phone held upright or a narrow
// iframe, so there the horizontal edge is used, whichever is longer. A
// standalone harp face passes the box it measured, its store's
// frameDimensions, which is used the same way.
export const getWindowDimensions = (
  frameDimensions?: FrameDimensions
): ReturnObject => {
  const { width, height } = frameDimensions ?? Dimensions.get('window')
  if (frameDimensions !== undefined || Platform.OS === 'web') {
    return { longEdge: width, shortEdge: height }
  }
  const longEdge = height > width ? height : width
  const shortEdge = height > width ? width : height

  return {
    longEdge,
    shortEdge,
  }
}
