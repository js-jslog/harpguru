import { Dimensions, Platform } from 'react-native'

type ReturnObject = {
  readonly longEdge: number
  readonly shortEdge: number
}

type Frame = {
  readonly width: number
  readonly height: number
}

let frame: Frame | undefined

// A standalone harp face shares its window with a page's own controls, so it
// measures the box it was given and sizes itself from that instead of the
// window. There is one of these per window, so one harp face per page.
export const setFrameDimensions = (next: Frame | undefined): void => {
  frame = next
}

// The harp face always lies along the long edge. The app is locked to
// landscape, so on a device the long edge is the horizontal one, and taking
// the longer of the two keeps a portrait reading at launch from sizing it
// wrongly. A browser window can be any shape, a phone held upright or a narrow
// iframe, so there the horizontal edge is used, whichever is longer.
export const getWindowDimensions = (): ReturnObject => {
  const { width, height } = frame ?? Dimensions.get('window')
  if (frame !== undefined || Platform.OS === 'web') {
    return { longEdge: width, shortEdge: height }
  }
  const longEdge = height > width ? height : width
  const shortEdge = height > width ? width : height

  return {
    longEdge,
    shortEdge,
  }
}
