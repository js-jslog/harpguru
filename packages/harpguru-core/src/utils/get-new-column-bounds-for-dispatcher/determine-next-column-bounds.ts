import { ZoomIds } from '../../types'

import { determineBest7Holes } from './determine-best-7-holes'

export const determineNextColumnBounds = (
  harpLength: number,
  currentColumnBounds: 'FIT' | readonly [number, number],
  zoomId: ZoomIds
): 'FIT' | readonly [number, number] => {
  return (() => {
    if (zoomId === ZoomIds.Fit) return 'FIT'
    if (currentColumnBounds === 'FIT') {
      if (zoomId === ZoomIds.Seven) return [0, 6] as const
      throw Error('TODO: IMPROVE THIS MESSAGE: Unexpected zoomId selected')
    }
    if (zoomId === ZoomIds.Seven) {
      return determineBest7Holes(harpLength, currentColumnBounds)
    }
    throw Error('TODO: IMPROVE THIS MESSAGE: Unexpected scenario has occurred')
  })()
}
