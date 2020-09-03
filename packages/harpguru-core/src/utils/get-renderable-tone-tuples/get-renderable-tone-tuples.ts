import { isNaturalPitch, getPitch } from 'harpstrata'
import type { PitchIds, DegreeIds } from 'harpstrata'

import { DisplayModes } from '../../types'
import type { RenderableToneTuples } from '../../types'

export const getRenderableToneTuples = (
  degreeId: DegreeIds | undefined,
  pitchId: PitchIds | undefined,
  displayMode: DisplayModes
): RenderableToneTuples => {
  if (degreeId === undefined || pitchId === undefined)
    return [[undefined, undefined]]

  if (displayMode === DisplayModes.Degree) {
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
