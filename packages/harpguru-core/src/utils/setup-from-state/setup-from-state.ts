import { getHarpStrata } from 'harpstrata'
import type { Setup, SetupDisplayMode } from 'harpstrata'
import type { HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import { DisplayModes, ExperienceModes } from '../../types'

const toSetupDisplayMode = (displayMode: DisplayModes): SetupDisplayMode =>
  displayMode === DisplayModes.Pitch ? 'pitch' : 'degree'

const toDisplayMode = (displayMode: SetupDisplayMode): DisplayModes =>
  displayMode === 'pitch' ? DisplayModes.Pitch : DisplayModes.Degree

// The setup a harp face is showing, as a setup link carries it
export const getSetupFromState = ({
  activeHarpStrata,
  activeDisplayMode,
}: {
  readonly activeHarpStrata: HarpStrata
  readonly activeDisplayMode: DisplayModes
}): Setup => {
  const {
    apparatus: { tuningId, valvingId },
    pozitionId,
    harpKeyId,
    activeDegreeIds,
  } = activeHarpStrata
  return {
    harpStrataProps: {
      tuningId,
      valvingId,
      pozitionId,
      harpKeyId,
      activeIds: activeDegreeIds,
    },
    displayMode: toSetupDisplayMode(activeDisplayMode),
  }
}

// What a harp face's store takes to show a setup it has been handed. The
// derivation fans the harp strata out into every other field. Explore,
// because a quiz would hide the setup the link was opened to show, and no
// cell taps still waiting to be applied, which would change it.
export const getStateFromSetup = ({
  harpStrataProps,
  displayMode,
}: Setup): {
  readonly activeHarpStrata: HarpStrata
  readonly activeDisplayMode: DisplayModes
  readonly activeExperienceMode: ExperienceModes
  readonly bufferedActivityToggles: ReadonlyArray<DegreeIds>
} => ({
  activeHarpStrata: getHarpStrata(harpStrataProps),
  activeDisplayMode: toDisplayMode(displayMode),
  activeExperienceMode: ExperienceModes.Explore,
  bufferedActivityToggles: [],
})
