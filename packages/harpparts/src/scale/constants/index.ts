import { ScaleIds } from '../types'
import type { Scale } from '../types'
import { DegreeIds } from '../../degree'

const {
  Root,
  Second,
  Flat3,
  Third,
  Fourth,
  Fifth,
  Sixth,
  Flat7,
  Seventh,
} = DegreeIds

export const MAJOR_TRIAD: Scale = {
  id: ScaleIds.MajorTriad,
  label: 'Major triad',
  degrees: [Root, Third, Fifth],
}

export const MINOR_TRIAD: Scale = {
  id: ScaleIds.MinorTriad,
  label: 'Minor triad',
  degrees: [Root, Flat3, Fifth],
}

export const MAJOR_PENTATONIC: Scale = {
  id: ScaleIds.MajorPentatonic,
  label: 'Major pentatonic',
  degrees: [Root, Second, Third, Fifth, Sixth],
}

export const MINOR_PENTATONIC: Scale = {
  id: ScaleIds.MinorPentatonic,
  label: 'Minor pentatonic',
  degrees: [Root, Flat3, Fourth, Fifth, Flat7],
}

export const MAJOR: Scale = {
  id: ScaleIds.Major,
  label: 'Major scale',
  degrees: [Root, Second, Third, Fourth, Fifth, Sixth, Seventh],
}
