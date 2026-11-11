import { PozitionIds, ScaleIds, TuningIds } from 'harpparts'

const { First, Second, Third } = PozitionIds

type PozitionPlan = {
  readonly pozitionId: PozitionIds
  // A scale for a pozition whose unbent notes make no named scale. Only
  // there: where they do make one, that one is shown, so the page can't
  // contradict the reeds. A test holds this.
  readonly scaleId?: ScaleIds
  // What the pozition is for. Its home holes are worked out from the reeds,
  // so they aren't written here.
  readonly description: string
}

type PresetPlan = {
  // What the tuning is, in a sentence or two
  readonly description: string
  // The pozitions the tuning is designed to be played in, in the order the
  // page offers them. The first is where the page opens.
  readonly pozitions: ReadonlyArray<PozitionPlan>
}

// The tunings that have a page, in the order they are listed, and what each
// page offers. A tuning missing here has no page yet, though setup links and
// embeds still show it: its slug is frozen in harpparts all the same, so
// adding it later is one entry. Pozitions may be added to a tuning, never
// taken away, since /t/ URLs carry them; one taken away anyway sends its links
// to the first preset. The pozitions are judgements about what each harp is
// built for, not facts in the data.
//
// The text says only what the reeds show or what is settled among players.
// A tuning whose reeds we aren't sure of waits for its page: Harmonic minor
// does, until its draw 6 and 10 are checked.
export const tuningPresets: Readonly<Partial<Record<TuningIds, PresetPlan>>> = {
  [TuningIds.MajorDiatonic]: {
    description:
      'The ten-hole harp most players own. Its blow notes make the harp’s own major chord, so it plays chords as readily as tunes.',
    pozitions: [
      {
        pozitionId: Second,
        description:
          'Cross harp, the blues and rock position. Bending the draw notes in holes 1 to 4 finds the blue notes.',
      },
      {
        pozitionId: First,
        description:
          'Straight harp, in the harp’s own key. Holes 4 to 7 hold a complete major scale for melodies.',
      },
      {
        pozitionId: Third,
        description: 'Slant harp. A minor sound with a bright sixth.',
      },
    ],
  },
  [TuningIds.Country]: {
    description:
      'A major diatonic with draw 5 raised a half step, which gives cross harp the major seventh.',
    pozitions: [
      {
        pozitionId: Second,
        scaleId: ScaleIds.Major,
        description:
          'Cross harp in a major key. The raised draw 5 replaces the flat seventh in the middle octave.',
      },
    ],
  },
  [TuningIds.NaturalMinor]: {
    description:
      'Retuned so that cross harp plays in a minor key. The flat third and flat sixth are in the reeds.',
    pozitions: [
      {
        pozitionId: Second,
        description:
          'The minor key, played where the blues player already plays.',
      },
    ],
  },
  [TuningIds.MelodyMaker]: {
    description:
      'Retuned so that cross harp plays a major scale: blow 3 is raised a whole step, and draw 5 and 9 a half step.',
    pozitions: [
      {
        pozitionId: Second,
        description:
          'A major scale with no gaps from draw 2 to blow 9, and the bends of cross harp kept.',
      },
    ],
  },
  [TuningIds.PaddyRichter]: {
    description:
      'Brendan Power’s tuning for Irish music. A major diatonic with blow 3 raised a whole step, so the low octave has the sixth that a standard harp only reaches by bending.',
    pozitions: [
      {
        pozitionId: First,
        description:
          'Straight harp, with more of a melody playable in the low octave.',
      },
      {
        pozitionId: Second,
        description:
          'Cross harp still works, though blow 3 is no longer a home note.',
      },
    ],
  },
  [TuningIds.PowerBender]: {
    description:
      'Holes 1 to 3 are standard. Above them every draw note stays higher than its blow note, so draw bends carry on up the harp.',
    pozitions: [
      {
        pozitionId: Second,
        description: 'Cross harp, with draw bends in every octave.',
      },
      {
        pozitionId: Third,
        description: 'A minor sound that bends on the draw from bottom to top.',
      },
    ],
  },
  [TuningIds.PowerDraw]: {
    description:
      'Holes 1 to 6 are standard. In holes 7 to 10 the draw notes are higher than the blow notes, so the top of the harp draws and bends like the bottom.',
    pozitions: [
      {
        pozitionId: First,
        description: 'Straight harp, with the top end on the draw.',
      },
      {
        pozitionId: Second,
        description: 'Cross harp, with draw bends right to the top.',
      },
    ],
  },
  [TuningIds.Wilde]: {
    description:
      'Holes 1 to 5 are standard. Above them every draw note is higher than its blow note, so the top of the harp bends on the draw.',
    pozitions: [
      {
        pozitionId: Second,
        description:
          'Cross harp, with draw bends in the upper octave as well as the lower.',
      },
    ],
  },
  [TuningIds.TwelveHoleChromatic]: {
    description:
      'Three octaves of the major scale. A slide button raises every note a half step, so the harp reaches every key.',
    pozitions: [
      {
        pozitionId: First,
        scaleId: ScaleIds.Major,
        description: 'The harp’s own key, the way it is usually played.',
      },
      {
        pozitionId: Third,
        scaleId: ScaleIds.Dorian,
        description: 'A minor sound with no slide needed.',
      },
    ],
  },
  [TuningIds.SixteenHoleChromatic]: {
    description: 'The 12-hole chromatic with a fourth octave below.',
    pozitions: [
      {
        pozitionId: First,
        scaleId: ScaleIds.Major,
        description: 'The harp’s own key, one octave deeper than the 12 hole.',
      },
      {
        pozitionId: Third,
        scaleId: ScaleIds.Dorian,
        description: 'A minor sound with no slide needed.',
      },
    ],
  },
} as const
