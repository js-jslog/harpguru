import {
  buildApparatus,
  TuningIds,
  PitchIds,
  PozitionIds,
  ValvingIds,
} from 'harpparts'

import type { HarpStrata } from '../../types'

import { EXAMPLE_PITCH_MATRICES } from './example-pitch-matrices'
import { EXAMPLE_IS_ACTIVE_IDS_PAIR } from './example-is-active-ids-pair'
import { EXAMPLE_DEGREE_MATRICES } from './example-degree-matrices'

const cRichterFirstPozitionCMajorPentatonic: HarpStrata = {
  apparatus: buildApparatus(TuningIds.Richter, ValvingIds.NotValved),
  degreeMatrix:
    EXAMPLE_DEGREE_MATRICES.richter.firstPozition.notValved.degreeMatrix,
  pitchMatrix: EXAMPLE_PITCH_MATRICES.richter.cHarp.notValved.pitchMatrix,
  activeDegreeIds:
    EXAMPLE_IS_ACTIVE_IDS_PAIR.cHarp.firstPozition.cMajorPentatonic
      .activeDegreeIds,
  activePitchIds:
    EXAMPLE_IS_ACTIVE_IDS_PAIR.cHarp.firstPozition.cMajorPentatonic
      .activePitchIds,
  pozitionId: PozitionIds.First,
  rootPitchId: PitchIds.C,
  harpKeyId: PitchIds.C,
} as const

const cRichterFirstPozitionCMajorPentatonicHalfValved: HarpStrata = {
  apparatus: buildApparatus(TuningIds.Richter, ValvingIds.HalfValved),
  degreeMatrix:
    EXAMPLE_DEGREE_MATRICES.richter.firstPozition.halfValved.degreeMatrix,
  pitchMatrix: EXAMPLE_PITCH_MATRICES.richter.cHarp.halfValved.pitchMatrix,
  activeDegreeIds:
    EXAMPLE_IS_ACTIVE_IDS_PAIR.cHarp.firstPozition.cMajorPentatonic
      .activeDegreeIds,
  activePitchIds:
    EXAMPLE_IS_ACTIVE_IDS_PAIR.cHarp.firstPozition.cMajorPentatonic
      .activePitchIds,
  pozitionId: PozitionIds.First,
  rootPitchId: PitchIds.C,
  harpKeyId: PitchIds.C,
} as const

const cRichterSecondPozitionGMajorPentatonic: HarpStrata = {
  apparatus: buildApparatus(TuningIds.Richter, ValvingIds.NotValved),
  degreeMatrix:
    EXAMPLE_DEGREE_MATRICES.richter.secondPozition.notValved.degreeMatrix,
  pitchMatrix: EXAMPLE_PITCH_MATRICES.richter.cHarp.notValved.pitchMatrix,
  activeDegreeIds:
    EXAMPLE_IS_ACTIVE_IDS_PAIR.cHarp.secondPozition.gMajorPentatonic
      .activeDegreeIds,
  activePitchIds:
    EXAMPLE_IS_ACTIVE_IDS_PAIR.cHarp.secondPozition.gMajorPentatonic
      .activePitchIds,
  pozitionId: PozitionIds.Second,
  rootPitchId: PitchIds.G,
  harpKeyId: PitchIds.C,
} as const

export const EXAMPLE_STRATA = {
  richter: {
    cHarp: {
      firstPozition: {
        notValved: {
          cMajorPentatonic: {
            harpStrata: cRichterFirstPozitionCMajorPentatonic,
          },
        },
        halfValved: {
          cMajorPentatonic: {
            harpStrata: cRichterFirstPozitionCMajorPentatonicHalfValved,
          },
        },
      },
      secondPozition: {
        notValved: {
          gMajorPentatonic: {
            harpStrata: cRichterSecondPozitionGMajorPentatonic,
          },
        },
      },
    },
  },
} as const
