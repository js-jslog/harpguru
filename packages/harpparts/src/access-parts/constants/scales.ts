import { ScaleIds } from '../../scale'
import {
  MAJOR_TRIAD,
  MINOR_TRIAD,
  MAJOR_PENTATONIC,
  MINOR_PENTATONIC,
  BLUES,
  MAJOR,
  MIXOLYDIAN,
  DORIAN,
  AEOLIAN,
  PHRYGIAN,
  LOCRIAN,
  LYDIAN,
  HARMONIC_MINOR,
  DIMINISHED_SCALE,
  WHOLE_TONE,
} from '../../scale'
import type { Scale } from '../../scale'

export const ORDERED_SCALES = new Map<ScaleIds, Scale>()
ORDERED_SCALES.set(ScaleIds.MajorTriad, MAJOR_TRIAD)
ORDERED_SCALES.set(ScaleIds.MinorTriad, MINOR_TRIAD)
ORDERED_SCALES.set(ScaleIds.MajorPentatonic, MAJOR_PENTATONIC)
ORDERED_SCALES.set(ScaleIds.MinorPentatonic, MINOR_PENTATONIC)
ORDERED_SCALES.set(ScaleIds.Blues, BLUES)
ORDERED_SCALES.set(ScaleIds.Major, MAJOR)
ORDERED_SCALES.set(ScaleIds.Mixolydian, MIXOLYDIAN)
ORDERED_SCALES.set(ScaleIds.Dorian, DORIAN)
ORDERED_SCALES.set(ScaleIds.Aeolian, AEOLIAN)
ORDERED_SCALES.set(ScaleIds.Phrygian, PHRYGIAN)
ORDERED_SCALES.set(ScaleIds.Locrian, LOCRIAN)
ORDERED_SCALES.set(ScaleIds.Lydian, LYDIAN)
ORDERED_SCALES.set(ScaleIds.HarmonicMinor, HARMONIC_MINOR)
ORDERED_SCALES.set(ScaleIds.DiminishedScale, DIMINISHED_SCALE)
ORDERED_SCALES.set(ScaleIds.WholeTone, WHOLE_TONE)
