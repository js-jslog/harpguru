import { HarpPartTypes } from '../../types'
import type { HarpPart } from '../../types'
import type { DegreeIds } from '../../degree'

import { PitchIds } from './types'
import type { NaturalPitch, Pitch } from './types'

export const isPitchId = (idIn: string): idIn is PitchIds => {
  return Object.values(PitchIds).includes(idIn as PitchIds)
}

export const isPitchIdArray = (
  arrayIn: ReadonlyArray<PitchIds> | ReadonlyArray<DegreeIds>
): arrayIn is ReadonlyArray<PitchIds> => isPitchId(arrayIn[0])

export const isNaturalPitch = (pitch: Pitch): pitch is NaturalPitch => {
  const {
    contextualDisplayValues: { natural },
  } = pitch as NaturalPitch
  return natural !== undefined
}

export const isPitch = (harppart: HarpPart): harppart is Pitch => {
  return harppart.type === HarpPartTypes.Pitch
}
