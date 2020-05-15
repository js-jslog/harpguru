import React from 'react'

import type {HarpFaceProps} from '../types'
import {HarpRow} from '../../HarpRow'

export const HarpFace = (props: HarpFaceProps): React.ReactElement => {
  return (
    <>
      <HarpRow {...props} yCoord={2} />
      <HarpRow {...props} yCoord={3} />
      <HarpRow {...props} yCoord={4} />
      <HarpRow {...props} yCoord={5} />
    </>
  )
}
