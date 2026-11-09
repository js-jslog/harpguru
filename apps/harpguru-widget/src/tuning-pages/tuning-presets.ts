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

// The tunings that have a page, in the order they are listed, and what each
// page offers. A tuning missing here has no page yet, though setup links and
// embeds still show it: its slug is frozen in harpparts all the same, so
// adding it later is one entry. Pozitions may be added to a tuning, never
// taken away, since /t/ URLs carry them. A DRAFT for review: the pozitions
// are judgements about what each harp is built for, not facts in the data.
export const tuningPresets: Readonly<Partial<Record<TuningIds, PresetPlan>>> = {
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
  [TuningIds.PaddyRichter]: { pozitions: [First, Second] },
  [TuningIds.PowerBender]: { pozitions: [Second, Third] },
  [TuningIds.PowerDraw]: { pozitions: [First, Second] },
  [TuningIds.Wilde]: { pozitions: [Second] },
  [TuningIds.TwelveHoleChromatic]: {
    pozitions: [First, Third],
    scales: { [First]: ScaleIds.Major, [Third]: ScaleIds.Dorian },
  },
  [TuningIds.SixteenHoleChromatic]: {
    pozitions: [First, Third],
    scales: { [First]: ScaleIds.Major, [Third]: ScaleIds.Dorian },
  },
} as const
