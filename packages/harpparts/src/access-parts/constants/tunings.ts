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
  RICHTER_MIXOLYDIAN,
  RICHTER_DORIAN,
  RICHTER_AEOLIAN,
  RICHTER_PHRYGIAN,
  RICHTER_LOCRIAN,
  RICHTER_LYDIAN,
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
orderedTunings.set(TuningIds.RichterMixolydian, RICHTER_MIXOLYDIAN)
orderedTunings.set(TuningIds.RichterDorian, RICHTER_DORIAN)
orderedTunings.set(TuningIds.RichterAeolian, RICHTER_AEOLIAN)
orderedTunings.set(TuningIds.RichterPhrygian, RICHTER_PHRYGIAN)
orderedTunings.set(TuningIds.RichterLocrian, RICHTER_LOCRIAN)
orderedTunings.set(TuningIds.RichterLydian, RICHTER_LYDIAN)
orderedTunings.set(TuningIds.WholeTone, WHOLE_TONE)
orderedTunings.set(TuningIds.Diminished, DIMINISHED)
