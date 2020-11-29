import { InteractionIds } from 'harpparts'
import type { HarpFaceRow, Interaction } from 'harpparts'

export const mapRowToBlowDrawIds = (
  row: HarpFaceRow<Interaction>
): InteractionIds | undefined => {
  const [firstInteraction] = row
  const { id } = firstInteraction || { id: undefined }

  if (id === InteractionIds.Blow || id === InteractionIds.Draw) return id
  return undefined
}
