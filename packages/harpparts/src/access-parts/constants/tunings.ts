import { TuningIds } from '../../tuning'
import {
  RICHTER,
  COUNTRY,
  NATURAL_MINOR,
  HARMONIC_MINOR,
  MELODY_MAKER,
  WILDE,
  POWER_BENDER,
  POWER_DRAW,
  PADDY_RICHTER,
  BLUES_ONE,
  BLUES_TWO,
  BLUES_THREE,
  CHORD,
  EASY_THIRD,
  BAGPIPE,
  WILL_SCARLETT,
  WOOZLE_MINOR,
  AUGMENTED_SPANISH,
  SPIRAL_CIRCULAR,
  MIXOLYDIAN,
  PHRYGIAN,
  LOCRIAN,
  WHOLE_TONE,
  DIMINISHED,
} from '../../tuning'
import type { Tuning } from '../../tuning'

export const orderedTunings = new Map<TuningIds, Tuning>()
orderedTunings.set(TuningIds.Richter, RICHTER)
orderedTunings.set(TuningIds.Country, COUNTRY)
orderedTunings.set(TuningIds.NaturalMinor, NATURAL_MINOR)
orderedTunings.set(TuningIds.HarmonicMinor, HARMONIC_MINOR)
orderedTunings.set(TuningIds.MelodyMaker, MELODY_MAKER)
orderedTunings.set(TuningIds.Wilde, WILDE)
orderedTunings.set(TuningIds.PowerBender, POWER_BENDER)
orderedTunings.set(TuningIds.PowerDraw, POWER_DRAW)
orderedTunings.set(TuningIds.PaddyRichter, PADDY_RICHTER)
orderedTunings.set(TuningIds.BluesOne, BLUES_ONE)
orderedTunings.set(TuningIds.BluesTwo, BLUES_TWO)
orderedTunings.set(TuningIds.BluesThree, BLUES_THREE)
orderedTunings.set(TuningIds.Chord, CHORD)
orderedTunings.set(TuningIds.EasyThird, EASY_THIRD)
orderedTunings.set(TuningIds.Bagpipe, BAGPIPE)
orderedTunings.set(TuningIds.WillScarlett, WILL_SCARLETT)
orderedTunings.set(TuningIds.WoozleMinor, WOOZLE_MINOR)
orderedTunings.set(TuningIds.AugmentedSpanish, AUGMENTED_SPANISH)
orderedTunings.set(TuningIds.SpiralCircular, SPIRAL_CIRCULAR)
orderedTunings.set(TuningIds.Mixolydian, MIXOLYDIAN)
orderedTunings.set(TuningIds.Phrygian, PHRYGIAN)
orderedTunings.set(TuningIds.Locrian, LOCRIAN)
orderedTunings.set(TuningIds.WholeTone, WHOLE_TONE)
orderedTunings.set(TuningIds.Diminished, DIMINISHED)
