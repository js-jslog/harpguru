import { InteractionIds } from 'harpstrata'
import type { InteractionRow } from 'harpstrata'

export const mapRowToBlowDrawIds = (
  row: InteractionRow
): InteractionIds | undefined => {
  const [firstInteraction] = row
  const { id } = firstInteraction || { id: undefined }

  if (id === InteractionIds.Blow || id === InteractionIds.Draw) return id
  return undefined
}
