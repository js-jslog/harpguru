import { PozitionIds } from '../types'
import type { Pozition } from '../types'

const FIRST:    Pozition = { id: PozitionIds.First,    rootOffset: 0  }
const EIGHTH:   Pozition = { id: PozitionIds.Eighth,   rootOffset: 1  }
const THIRD:    Pozition = { id: PozitionIds.Third,    rootOffset: 2  }
const TENTH:    Pozition = { id: PozitionIds.Tenth,    rootOffset: 3  }
const FIFTH:    Pozition = { id: PozitionIds.Fifth,    rootOffset: 4  }
const TWELFTH:  Pozition = { id: PozitionIds.Twelfth,  rootOffset: 5  }
const SEVENTH:  Pozition = { id: PozitionIds.Seventh,  rootOffset: 6  }
const SECOND:   Pozition = { id: PozitionIds.Second,   rootOffset: 7  }
const NINTH:    Pozition = { id: PozitionIds.Ninth,    rootOffset: 8  }
const FOURTH:   Pozition = { id: PozitionIds.Fourth,   rootOffset: 9  }
const ELEVENTH: Pozition = { id: PozitionIds.Eleventh, rootOffset: 10 }
const SIXTH:    Pozition = { id: PozitionIds.Sixth,    rootOffset: 11 }


export const POZITION_INSTANCES = {
  [ PozitionIds.First    ]: FIRST,
  [ PozitionIds.Second   ]: SECOND,
  [ PozitionIds.Third    ]: THIRD,
  [ PozitionIds.Fourth   ]: FOURTH,
  [ PozitionIds.Fifth    ]: FIFTH,
  [ PozitionIds.Sixth    ]: SIXTH,
  [ PozitionIds.Seventh  ]: SEVENTH,
  [ PozitionIds.Eighth   ]: EIGHTH,
  [ PozitionIds.Ninth    ]: NINTH,
  [ PozitionIds.Tenth    ]: TENTH,
  [ PozitionIds.Eleventh ]: ELEVENTH,
  [ PozitionIds.Twelfth  ]: TWELFTH,
} as const
