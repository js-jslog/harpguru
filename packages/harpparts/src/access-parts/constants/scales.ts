import { ScaleIds } from '../../scale'
import {
  MAJOR_TRIAD,
  MINOR_TRIAD,
  MAJOR_SEVENTH,
  MINOR_SEVENTH,
  DOMINANT_SEVENTH,
  DIMINISHED_CHORD,
  DIMINISHED_SEVENTH,
  AUGMENTED_CHORD,
  AUGMENTED_SEVENTH,
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

export const orderedScales = new Map<ScaleIds, Scale>()
orderedScales.set(ScaleIds.MajorTriad, MAJOR_TRIAD)
orderedScales.set(ScaleIds.MinorTriad, MINOR_TRIAD)
orderedScales.set(ScaleIds.MajorSeventh, MAJOR_SEVENTH)
orderedScales.set(ScaleIds.MinorSeventh, MINOR_SEVENTH)
orderedScales.set(ScaleIds.DominantSeventh, DOMINANT_SEVENTH)
orderedScales.set(ScaleIds.DiminishedChord, DIMINISHED_CHORD)
orderedScales.set(ScaleIds.DiminishedSeventh, DIMINISHED_SEVENTH)
orderedScales.set(ScaleIds.AugmentedChord, AUGMENTED_CHORD)
orderedScales.set(ScaleIds.AugmentedSeventh, AUGMENTED_SEVENTH)
orderedScales.set(ScaleIds.MajorPentatonic, MAJOR_PENTATONIC)
orderedScales.set(ScaleIds.MinorPentatonic, MINOR_PENTATONIC)
orderedScales.set(ScaleIds.Blues, BLUES)
orderedScales.set(ScaleIds.Major, MAJOR)
orderedScales.set(ScaleIds.Mixolydian, MIXOLYDIAN)
orderedScales.set(ScaleIds.Dorian, DORIAN)
orderedScales.set(ScaleIds.Aeolian, AEOLIAN)
orderedScales.set(ScaleIds.Phrygian, PHRYGIAN)
orderedScales.set(ScaleIds.Locrian, LOCRIAN)
orderedScales.set(ScaleIds.Lydian, LYDIAN)
orderedScales.set(ScaleIds.HarmonicMinor, HARMONIC_MINOR)
orderedScales.set(ScaleIds.DiminishedScale, DIMINISHED_SCALE)
orderedScales.set(ScaleIds.WholeTone, WHOLE_TONE)
