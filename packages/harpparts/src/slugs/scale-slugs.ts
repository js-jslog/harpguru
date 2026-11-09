import { ScaleIds } from '../scale'

// The slug a scale goes by in a URL. ScaleIds is a numeric enum, numbered by
// declaration order, so it can't be put in a URL itself. Frozen for the same
// reason as the tuning slugs: a slug never changes once shipped.
export const scaleSlugs: Readonly<Record<ScaleIds, string>> = {
  [ScaleIds.MajorTriad]: 'major-triad',
  [ScaleIds.MinorTriad]: 'minor-triad',
  [ScaleIds.MajorSeventh]: 'major-seventh',
  [ScaleIds.MinorSeventh]: 'minor-seventh',
  [ScaleIds.DominantSeventh]: 'dominant-seventh',
  [ScaleIds.MajorMinorSeventh]: 'major-minor-seventh',
  [ScaleIds.DiminishedChord]: 'diminished-chord',
  [ScaleIds.DiminishedSeventh]: 'diminished-seventh',
  [ScaleIds.AugmentedChord]: 'augmented-chord',
  [ScaleIds.AugmentedSeventh]: 'augmented-seventh',
  [ScaleIds.MajorPentatonic]: 'major-pentatonic',
  [ScaleIds.MinorPentatonic]: 'minor-pentatonic',
  [ScaleIds.Blues]: 'blues',
  [ScaleIds.Major]: 'major',
  [ScaleIds.Mixolydian]: 'mixolydian',
  [ScaleIds.Dorian]: 'dorian',
  [ScaleIds.Aeolian]: 'natural-minor',
  [ScaleIds.Phrygian]: 'phrygian',
  [ScaleIds.Locrian]: 'locrian',
  [ScaleIds.Lydian]: 'lydian',
  [ScaleIds.HarmonicMinor]: 'harmonic-minor',
  [ScaleIds.DiminishedScale]: 'diminished',
  [ScaleIds.WholeTone]: 'whole-tone',
} as const
