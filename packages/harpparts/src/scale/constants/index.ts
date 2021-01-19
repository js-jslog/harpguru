import { ScaleCategory, ScaleIds } from '../types'
import type { Scale } from '../types'
import { DegreeIds } from '../../degree'

const {
  Root,
  Flat2,
  Second,
  Flat3,
  Third,
  Fourth,
  Flat5,
  Fifth,
  Flat6,
  Sixth,
  Flat7,
  Seventh,
} = DegreeIds

export const MAJOR_TRIAD: Scale = {
  id: ScaleIds.MajorTriad,
  label: 'Major triad',
  degrees: [Root, Third, Fifth],
  category: ScaleCategory.Chord,
}

export const MINOR_TRIAD: Scale = {
  id: ScaleIds.MinorTriad,
  label: 'Minor triad',
  degrees: [Root, Flat3, Fifth],
  category: ScaleCategory.Chord,
}

export const MAJOR_PENTATONIC: Scale = {
  id: ScaleIds.MajorPentatonic,
  label: 'Major pentatonic',
  degrees: [Root, Second, Third, Fifth, Sixth],
  category: ScaleCategory.Scale,
}

export const MINOR_PENTATONIC: Scale = {
  id: ScaleIds.MinorPentatonic,
  label: 'Minor pentatonic',
  degrees: [Root, Flat3, Fourth, Fifth, Flat7],
  category: ScaleCategory.Scale,
}

export const MAJOR: Scale = {
  id: ScaleIds.Major,
  label: 'Major (Ionian)',
  degrees: [Root, Second, Third, Fourth, Fifth, Sixth, Seventh],
  category: ScaleCategory.Scale,
}

export const MIXOLYDIAN: Scale = {
  id: ScaleIds.Mixolydian,
  label: 'Mixolydian',
  degrees: [Root, Second, Third, Fourth, Fifth, Sixth, Flat7],
  category: ScaleCategory.Scale,
}

export const DORIAN: Scale = {
  id: ScaleIds.Dorian,
  label: 'Dorian',
  degrees: [Root, Second, Flat3, Fourth, Fifth, Sixth, Flat7],
  category: ScaleCategory.Scale,
}

export const AEOLIAN: Scale = {
  id: ScaleIds.Aeolian,
  label: 'Natural minor (Aeolian)',
  degrees: [Root, Second, Flat3, Fourth, Fifth, Flat6, Flat7],
  category: ScaleCategory.Scale,
}

export const PHRYGIAN: Scale = {
  id: ScaleIds.Phrygian,
  label: 'Phrygian',
  degrees: [Root, Flat2, Flat3, Fourth, Fifth, Flat6, Flat7],
  category: ScaleCategory.Scale,
}

export const LOCRIAN: Scale = {
  id: ScaleIds.Locrian,
  label: 'Locrian',
  degrees: [Root, Flat2, Flat3, Fourth, Flat5, Flat6, Flat7],
  category: ScaleCategory.Scale,
}

export const LYDIAN: Scale = {
  id: ScaleIds.Lydian,
  label: 'Lydian',
  degrees: [Root, Second, Third, Flat5, Fifth, Sixth, Seventh],
  category: ScaleCategory.Scale,
}

export const HARMONIC_MINOR: Scale = {
  id: ScaleIds.HarmonicMinor,
  label: 'Harmonic minor',
  degrees: [Root, Second, Flat3, Fourth, Fifth, Flat6, Seventh],
  category: ScaleCategory.Scale,
}
