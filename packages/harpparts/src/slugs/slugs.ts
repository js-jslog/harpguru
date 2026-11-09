import type { TuningIds } from '../tuning'
import type { ScaleIds } from '../scale'

import { tuningSlugs } from './tuning-slugs'
import { scaleSlugs } from './scale-slugs'

export const getTuningSlug = (tuningId: TuningIds): string =>
  tuningSlugs[tuningId]

export const getTuningIdBySlug = (slug: string): TuningIds | undefined =>
  (Object.keys(tuningSlugs) as TuningIds[]).find(
    (tuningId) => tuningSlugs[tuningId] === slug
  )

export const getScaleSlug = (scaleId: ScaleIds): string => scaleSlugs[scaleId]

export const getScaleIdBySlug = (slug: string): ScaleIds | undefined => {
  const match = Object.entries(scaleSlugs).find(([, value]) => value === slug)
  return match === undefined ? undefined : (Number(match[0]) as ScaleIds)
}
