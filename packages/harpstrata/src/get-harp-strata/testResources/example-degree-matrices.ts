import { getDegree, DegreeIds, HarpFaceMatrices } from 'harpparts'
import type { Degree } from 'harpparts'

const root = getDegree(DegreeIds.Root)
const flat2 = getDegree(DegreeIds.Flat2)
const second = getDegree(DegreeIds.Second)
const flat3 = getDegree(DegreeIds.Flat3)
const third = getDegree(DegreeIds.Third)
const fourth = getDegree(DegreeIds.Fourth)
const flat5 = getDegree(DegreeIds.Flat5)
const fifth = getDegree(DegreeIds.Fifth)
const flat6 = getDegree(DegreeIds.Flat6)
const sixth = getDegree(DegreeIds.Sixth)
const flat7 = getDegree(DegreeIds.Flat7)
const seventh = getDegree(DegreeIds.Seventh)

// prettier-ignore
const majorDiatonicFirstPozition: HarpFaceMatrices<Degree> = {
  harpface1: [
    [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, flat7     ],
    [ flat3    , undefined, undefined, flat3    , flat5    , flat7    , undefined, flat3    , flat5    , seventh   ],
    [ root     , third    , fifth    , root     , third    , fifth    , root     , third    , fifth    , root      ],
    [ second   , fifth    , seventh  , second   , fourth   , sixth    , seventh  , second   , fourth   , sixth     ],
    [ flat2    , flat5    , flat7    , flat2    , undefined, flat6    , flat2    , undefined, flat6    , flat2     ],
    [ undefined, fourth   , sixth , undefined   , undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, undefined, flat6 , undefined   , undefined, undefined, undefined, undefined, undefined, undefined ],
  ]
}

// prettier-ignore
const majorDiatonicFirstPozitionHalfValved: HarpFaceMatrices<Degree> = {
  harpface1: [
    [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, flat7     ],
    [ seventh  , flat3    , flat5    , seventh  , flat3    , flat5    , undefined, flat3    , flat5    , seventh   ],
    [ root     , third    , fifth    , root     , third    , fifth    , root     , third    , fifth    , root      ],
    [ second   , fifth    , seventh  , second   , fourth   , sixth    , seventh  , second   , fourth   , sixth     ],
    [ flat2    , flat5    , flat7    , flat2    , undefined, flat6    , flat7    , flat2    , third    , flat6     ],
    [ undefined, fourth   , sixth    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, undefined, flat6    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ]
}

// prettier-ignore
const majorDiatonicSecondPozition: HarpFaceMatrices<Degree> = {
  harpface1: [
    [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, flat3     ],
    [ flat6    , undefined, undefined, flat6    , seventh  , flat3    , undefined, flat6    , seventh  , third     ],
    [ fourth   , sixth    , root     , fourth   , sixth    , root     , fourth   , sixth    , root     , fourth    ],
    [ fifth    , root     , third    , fifth    , flat7    , second   , third    , fifth    , flat7    , second    ],
    [ flat5    , seventh  , flat3    , flat5    , undefined, flat2    , flat5    , undefined, flat2    , flat5     ],
    [ undefined, flat7    , second   , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
    [ undefined, undefined, flat2    , undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
  ]
}

export const EXAMPLE_DEGREE_MATRICES = {
  majorDiatonic: {
    firstPozition: {
      notValved: {
        degreeMatrix: majorDiatonicFirstPozition,
      },
      halfValved: {
        degreeMatrix: majorDiatonicFirstPozitionHalfValved,
      },
    },
    secondPozition: {
      notValved: {
        degreeMatrix: majorDiatonicSecondPozition,
      },
    },
  },
} as const
