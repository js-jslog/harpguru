import { ApparatusIds, PozitionIds, PitchIds, getHarpStrata } from 'harpstrata'
import type { HarpStrataProps, ActiveIds } from 'harpstrata'

import type { HarpFaceProps } from '../index'
import { DisplayModes } from '../index'


const harpStrataProps: HarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  keyPitchId: PitchIds.C,
  activeIds: [] as ActiveIds,
}
const harpStrata = getHarpStrata(harpStrataProps)
const { Degree: displayMode } = DisplayModes

export const exampleHarpFaceProps: HarpFaceProps = {
  harpStrata,
  displayMode,
}
