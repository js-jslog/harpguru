import React from 'react'

import {
  useUpdatePozitionId,
  useUpdateRootPitchId,
  useUpdateHarpKeyId,
  useDeriveActiveDegreeIds,
  useDeriveActivePitchIds,
  useDeriveDegreeMatrix,
  useDerivePitchMatrix,
  useDeriveViewableDegreeMatrix,
  useDeriveViewablePitchMatrix,
  useDeriveColumnBounds,
  useDeriveLayoutFacts,
} from './hooks'

export const NewHarpStrataStateCallback = (): React.ReactElement => {
  useUpdatePozitionId()
  useUpdateRootPitchId()
  useUpdateHarpKeyId()
  useDeriveActiveDegreeIds()
  useDeriveActivePitchIds()
  useDeriveDegreeMatrix()
  useDerivePitchMatrix()
  useDeriveViewableDegreeMatrix()
  useDeriveViewablePitchMatrix()
  useDeriveColumnBounds()
  useDeriveLayoutFacts()

  return <></>
}
