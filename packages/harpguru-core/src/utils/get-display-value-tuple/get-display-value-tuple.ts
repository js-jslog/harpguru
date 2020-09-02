import { isNaturalPitch, getPitch } from 'harpstrata'
import type { PitchIds, DegreeIds } from 'harpstrata'

import { DisplayModes } from '../../types'

type DisplayValueTuple =
  | [string, string]
  | [string, undefined]
  | [undefined, undefined]

export type DisplayValues = ReadonlyArray<DisplayValueTuple>

export const getDisplayValueTuple = (
  degreeId: DegreeIds | undefined,
  pitchId: PitchIds | undefined,
  activeDisplayMode: DisplayModes
): DisplayValues => {
  if (degreeId === undefined || pitchId === undefined)
    return [[undefined, undefined]]

  if (activeDisplayMode === DisplayModes.Degree) {
    const [note, ...modifiers] = degreeId.split('')

    return [[note, modifiers.join('')]]
  }

  const pitch = getPitch(pitchId)
  if (isNaturalPitch(pitch)) {
    const {
      contextualDisplayValues: { natural },
    } = pitch
    return [[natural, undefined]]
  }

  const {
    contextualDisplayValues: { sharp, flat },
  } = pitch
  return [
    [sharp, '#'],
    [flat, 'b'],
  ]
}
