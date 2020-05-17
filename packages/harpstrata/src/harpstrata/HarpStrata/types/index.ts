import type { PozitionIds } from '../../Pozition'
import type { PitchIds, PitchMatrix } from '../../Pitch'
import type { ActiveIds, IsActiveComplex } from '../../IsActive'
import type { DegreeMatrix } from '../../Degree'
import type { Apparatus, ApparatusIds } from '../../Apparatus'

export type HarpStrataProps = {
  readonly apparatusId: ApparatusIds;
  readonly pozitionId: PozitionIds;
  readonly harpKeyId: PitchIds;
  readonly activeIds: ActiveIds;
}

export type HarpStrata = {
  readonly apparatus: Apparatus;
  readonly degreeMatrix: DegreeMatrix;
  readonly pitchMatrix: PitchMatrix;
  readonly isActiveComplex: IsActiveComplex;
  readonly pozitionId: PozitionIds;
  readonly rootPitchId: PitchIds | undefined;
  readonly harpKeyId: PitchIds;
}
