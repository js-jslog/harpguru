import { useGlobal } from 'reactn'
import React from 'react'

export const NewStateLogger = (): React.ReactElement => {
  const [rootPitchId] = useGlobal('rootPitchId')
  console.log('::::::::::::::::::::::::::::::: ' + rootPitchId)

  return <></>
}
