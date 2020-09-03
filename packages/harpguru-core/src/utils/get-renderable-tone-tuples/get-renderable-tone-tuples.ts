import { isPitchId, isNaturalPitch, getPitch } from 'harpstrata'
import type { PitchIds, DegreeIds } from 'harpstrata'

import type { RenderableToneTuples } from '../../types'

export const getRenderableToneTuples = (
  sourceId: DegreeIds | PitchIds | undefined
): RenderableToneTuples => {
  if (sourceId === undefined) return [['', '']]

  if (!isPitchId(sourceId)) {
    const [note, ...modifiers] = sourceId.split('')

    return [[note, modifiers.join('')]]
  }

  const pitch = getPitch(sourceId)
  if (isNaturalPitch(pitch)) {
    const {
      contextualDisplayValues: { natural },
    } = pitch
    return [[natural, '']]
  }

  const {
    contextualDisplayValues: { sharp, flat },
  } = pitch
  return [
    [sharp, '#'],
    [flat, 'b'],
  ]
}
