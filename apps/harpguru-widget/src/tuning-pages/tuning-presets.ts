import { PozitionIds, ScaleIds, TuningIds } from 'harpparts'

const { First, Second, Third } = PozitionIds

type PresetPlan = {
  // The pozitions the tuning is designed to be played in, in the order the
  // page offers them. The first is where the page opens.
  readonly pozitions: ReadonlyArray<PozitionIds>
  // A scale for a pozition whose unbent notes make no named scale. Only
  // there: where they do make one, that one is shown, so the page can't
  // contradict the reeds. A test holds this.
  readonly scales?: Partial<Record<PozitionIds, ScaleIds>>
}

// What each tuning page offers. Pozitions may be added to a tuning, never
// taken away, since /t/ URLs carry them. A DRAFT for review: the pozitions
// are judgements about what each harp is built for, not facts in the data.
export const tuningPresets: Readonly<Record<TuningIds, PresetPlan>> = {
  [TuningIds.MajorDiatonic]: { pozitions: [Second, First, Third] },
  [TuningIds.Country]: {
    pozitions: [Second],
    scales: { [Second]: ScaleIds.Major },
  },
  [TuningIds.NaturalMinor]: { pozitions: [Second] },
  [TuningIds.HarmonicMinor]: {
    pozitions: [First],
    scales: { [First]: ScaleIds.HarmonicMinor },
  },
  [TuningIds.MelodyMaker]: { pozitions: [Second] },
  [TuningIds.EasyDiatonic]: {
    pozitions: [First],
    scales: { [First]: ScaleIds.Major },
  },
  [TuningIds.TwelveHoleChromatic]: {
    pozitions: [First, Third],
    scales: { [First]: ScaleIds.Major, [Third]: ScaleIds.Dorian },
  },
  [TuningIds.SixteenHoleChromatic]: {
    pozitions: [First, Third],
    scales: { [First]: ScaleIds.Major, [Third]: ScaleIds.Dorian },
  },
  [TuningIds.DiminishedChromatic]: {
    pozitions: [First],
    scales: { [First]: ScaleIds.DiminishedScale },
  },
  [TuningIds.Wilde]: { pozitions: [Second] },
  [TuningIds.WildeMinor]: { pozitions: [Second] },
  [TuningIds.Circular]: { pozitions: [First, Second] },
  [TuningIds.OrchestraS]: { pozitions: [First, Second] },
  [TuningIds.PentaHarp]: { pozitions: [First] },
  [TuningIds.PowerBender]: { pozitions: [Second, Third] },
  [TuningIds.PowerDraw]: { pozitions: [First, Second] },
  [TuningIds.PaddyRichter]: { pozitions: [First, Second] },
  [TuningIds.Lucky13Richter]: { pozitions: [Second, First, Third] },
  [TuningIds.Lucky13PowerChromatic]: { pozitions: [Second, First, Third] },
  [TuningIds.BluesOne]: { pozitions: [Second] },
  [TuningIds.BluesTwo]: {
    pozitions: [Second],
    scales: { [Second]: ScaleIds.Mixolydian },
  },
  [TuningIds.BluesThree]: {
    pozitions: [Second],
    scales: { [Second]: ScaleIds.Mixolydian },
  },
  [TuningIds.Chord]: {
    pozitions: [First],
    scales: { [First]: ScaleIds.Major },
  },
  [TuningIds.RichterIonian]: { pozitions: [First] },
  [TuningIds.RichterMixolydian]: { pozitions: [First] },
  [TuningIds.RichterDorian]: { pozitions: [First] },
  [TuningIds.RichterAeolian]: { pozitions: [First] },
  [TuningIds.RichterPhrygian]: { pozitions: [First] },
  [TuningIds.RichterLocrian]: { pozitions: [First] },
  [TuningIds.RichterLydian]: { pozitions: [First] },
  [TuningIds.SpiralIonian]: { pozitions: [First] },
  [TuningIds.SpiralMixolydian]: { pozitions: [First] },
  [TuningIds.SpiralDorian]: { pozitions: [First] },
  [TuningIds.SpiralAeolian]: { pozitions: [First] },
  [TuningIds.SpiralPhrygian]: { pozitions: [First] },
  [TuningIds.SpiralLocrian]: { pozitions: [First] },
  [TuningIds.SpiralLydian]: { pozitions: [First] },
  [TuningIds.WholeTone]: { pozitions: [First] },
  [TuningIds.Diminished]: {
    pozitions: [First],
    scales: { [First]: ScaleIds.DiminishedScale },
  },
  [TuningIds.AugmentedSpanish]: { pozitions: [First] },
  [TuningIds.Bagpipe]: { pozitions: [First] },
  [TuningIds.EasyThird]: { pozitions: [Second, First] },
  [TuningIds.WillScarlett]: { pozitions: [Second] },
  [TuningIds.WoozleMinor]: { pozitions: [Second] },
  [TuningIds.BabyFat]: { pozitions: [Second, First] },
  [TuningIds.TwelveHoleSolo]: { pozitions: [First, Third] },
  [TuningIds.SixteenHoleSolo]: { pozitions: [First, Third] },
  [TuningIds.TrochilusRichter]: {
    pozitions: [Second, First, Third],
    scales: {
      [First]: ScaleIds.Major,
      [Second]: ScaleIds.Mixolydian,
      [Third]: ScaleIds.Dorian,
    },
  },
  [TuningIds.TrochilusPop]: {
    pozitions: [First, Second],
    scales: { [First]: ScaleIds.Major, [Second]: ScaleIds.Mixolydian },
  },
  [TuningIds.TrochilusSolo]: {
    pozitions: [First, Third],
    scales: { [First]: ScaleIds.Major, [Third]: ScaleIds.Dorian },
  },
  [TuningIds.TrochilusSixthSolo]: {
    pozitions: [First],
    scales: { [First]: ScaleIds.Major },
  },
} as const
