import React from 'react'

import {
  useUpdatePozitionId,
  useUpdateRootPitchId,
  useUpdateHarpKeyId,
} from './hooks'

export const NewHarpStrataStateCallback = (): React.ReactElement => {
  useUpdatePozitionId()
  useUpdateRootPitchId()
  useUpdateHarpKeyId()

  return <></>
}
