import { ScaleIds } from '../../scale'
import {
  MAJOR_TRIAD,
  MINOR_TRIAD,
  MAJOR_PENTATONIC,
  MINOR_PENTATONIC,
  MAJOR,
} from '../../scale'
import type { Scale } from '../../scale'

export const ORDERED_SCALES = new Map<ScaleIds, Scale>()
ORDERED_SCALES.set(ScaleIds.MajorTriad, MAJOR_TRIAD)
ORDERED_SCALES.set(ScaleIds.MinorTriad, MINOR_TRIAD)
ORDERED_SCALES.set(ScaleIds.MajorPentatonic, MAJOR_PENTATONIC)
ORDERED_SCALES.set(ScaleIds.MinorPentatonic, MINOR_PENTATONIC)
ORDERED_SCALES.set(ScaleIds.Major, MAJOR)
