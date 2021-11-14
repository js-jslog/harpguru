import type { HarpFaceRow, Interaction, InteractionIds } from 'harpparts'

const errorMessage = `
There is a misalignment between the input row and it's sibling
interaction row while removing based on interactions.
`
type MapRowToRemoveInteractionProps = {
  readonly interactionRow: HarpFaceRow<Interaction>
  readonly removeInteractionIds: ReadonlyArray<InteractionIds>
}

export const mapRowToRemoveBySiblingInteraction = <T>(
  { interactionRow, removeInteractionIds }: MapRowToRemoveInteractionProps,
  rowForMapping: HarpFaceRow<T>
): HarpFaceRow<T> => {
  const mappedRow = rowForMapping.map((item, index) => {
    const { [index]: siblingInteraction } = interactionRow
    if (siblingInteraction !== undefined) {
      if (removeInteractionIds.includes(siblingInteraction.id)) return undefined
      return item
    }
    if (item !== undefined) throw Error(errorMessage)
    return item
  })
  return mappedRow
}
