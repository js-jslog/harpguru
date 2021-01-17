import { Dimensions } from 'react-native'

type ReturnObject = {
  readonly longEdge: number
  readonly shortEdge: number
}

export const getWindowDimensions = (): ReturnObject => {
  const { width, height } = Dimensions.get('window')
  const longEdge = height < width ? height : width
  const shortEdge = height < width ? width : height

  return {
    longEdge,
    shortEdge,
  }
}
