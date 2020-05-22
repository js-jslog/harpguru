import { ApparatusIds, PozitionIds, PitchIds, getHarpStrata } from 'harpstrata'
import type { HarpStrata, HarpStrataProps, ActiveIds } from 'harpstrata'

import type { HarpFaceProps } from '../index'
import { DisplayModes } from '../index'


const harpStrataProps: HarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [] as ActiveIds,
}
const activeHarpStrata = getHarpStrata(harpStrataProps)
const { Degree: activeDisplayMode } = DisplayModes
// TODO: If I add a jest.fn() here rather than this nonesense function
// the gradle build fails. I need to figure out to make the testResources
// folders ignored in the build
const setActiveHarpStrata = (activeHarpStrata: HarpStrata): void => {console.log(activeHarpStrata)}

export const exampleHarpFaceProps: HarpFaceProps = {
  activeHarpStrata,
  activeDisplayMode,
  setActiveHarpStrata,
}
