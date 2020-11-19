import { IsActiveIds, IsActiveRow, IsActiveMatrix } from '../../types'
import { IsActiveProps } from '../../../types'
import type { Pitch, PitchRow } from '../../../../Pitch'
import { PitchIds } from '../../../../Pitch'
import type { Degree, DegreeRow } from '../../../../Degree'
import { DegreeIds } from '../../../../Degree'

export const getMatrixGivenDegree = (props: IsActiveProps): IsActiveMatrix => {
  const { degreeMatrix: sji, activeIds } = props
  const activeDegreeIds = activeIds as ReadonlyArray<DegreeIds>
  const mapDegree = (degree: Degree | undefined): IsActiveIds | undefined => {
    if (degree === undefined) return undefined
    return degree && activeDegreeIds.includes(degree.id)
      ? IsActiveIds.Active
      : IsActiveIds.Inactive
  }
  const mapDegreeRow = (degreeRow: DegreeRow): IsActiveRow =>
    degreeRow.map(mapDegree)

  const isActiveMatrix: IsActiveMatrix = sji.map(mapDegreeRow)
  return isActiveMatrix
}

export const getMatrixGivenPitch = (props: IsActiveProps): IsActiveMatrix => {
  const { pitchMatrix, activeIds } = props
  const activePitchIds = activeIds as ReadonlyArray<PitchIds>
  const mapPitch = (pitch: Pitch | undefined): IsActiveIds | undefined => {
    if (pitch === undefined) return undefined
    return pitch && activePitchIds.includes(pitch.id)
      ? IsActiveIds.Active
      : IsActiveIds.Inactive
  }
  const mapPitchRow = (pitch: PitchRow): IsActiveRow => pitch.map(mapPitch)

  const isActiveMatrix: IsActiveMatrix = pitchMatrix.map(mapPitchRow)
  return isActiveMatrix
}
