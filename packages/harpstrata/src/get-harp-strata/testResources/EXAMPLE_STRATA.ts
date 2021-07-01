import {
  buildApparatus,
  TuningIds,
  PitchIds,
  PozitionIds,
  ValvingIds,
} from 'harpparts'

import type { HarpStrata } from '../../types'

import { EXAMPLE_PITCH_MATRICES } from './EXAMPLE_PITCH_MATRICES'
import { EXAMPLE_IS_ACTIVE_IDS_PAIR } from './EXAMPLE_IS_ACTIVE_IDS_PAIR'
import { EXAMPLE_DEGREE_MATRICES } from './EXAMPLE_DEGREE_MATRICES'

const cMajorDiatonicFirstPozitionCMajorPentatonic: HarpStrata = {
  apparatus: buildApparatus(TuningIds.MajorDiatonic, ValvingIds.NotValved),
  degreeMatrix:
    EXAMPLE_DEGREE_MATRICES.majorDiatonic.firstPozition.notValved.degreeMatrix,
  pitchMatrix: EXAMPLE_PITCH_MATRICES.majorDiatonic.cHarp.notValved.pitchMatrix,
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

const cMajorDiatonicFirstPozitionCMajorPentatonicHalfValved: HarpStrata = {
  apparatus: buildApparatus(TuningIds.MajorDiatonic, ValvingIds.HalfValved),
  degreeMatrix:
    EXAMPLE_DEGREE_MATRICES.majorDiatonic.firstPozition.halfValved.degreeMatrix,
  pitchMatrix:
    EXAMPLE_PITCH_MATRICES.majorDiatonic.cHarp.halfValved.pitchMatrix,
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

const cMajorDiatonicSecondPozitionGMajorPentatonic: HarpStrata = {
  apparatus: buildApparatus(TuningIds.MajorDiatonic, ValvingIds.NotValved),
  degreeMatrix:
    EXAMPLE_DEGREE_MATRICES.majorDiatonic.secondPozition.notValved.degreeMatrix,
  pitchMatrix: EXAMPLE_PITCH_MATRICES.majorDiatonic.cHarp.notValved.pitchMatrix,
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
  majorDiatonic: {
    cHarp: {
      firstPozition: {
        notValved: {
          cMajorPentatonic: {
            harpStrata: cMajorDiatonicFirstPozitionCMajorPentatonic,
          },
        },
        halfValved: {
          cMajorPentatonic: {
            harpStrata: cMajorDiatonicFirstPozitionCMajorPentatonicHalfValved,
          },
        },
      },
      secondPozition: {
        notValved: {
          gMajorPentatonic: {
            harpStrata: cMajorDiatonicSecondPozitionGMajorPentatonic,
          },
        },
      },
    },
  },
} as const
