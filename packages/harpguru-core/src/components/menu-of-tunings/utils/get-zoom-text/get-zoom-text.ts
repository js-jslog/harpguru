import { ZoomIds } from '../../../../types'

export const getZoomText = (zoomId: ZoomIds): string => {
  if (zoomId === ZoomIds.Fit) return 'Fit whole harp'
  return `${zoomId} holes`
}
