import type {
  HarpFaceMatrix,
  HarpFaceRow,
  Interaction,
  InteractionIds,
} from 'harpparts'

const errorMessage = `
There is a misalignment between the input row and it's sibling
interaction row while removing based on interactions.
`

export type SupportInteractionProps = {
  readonly interactionMatrix: HarpFaceMatrix<Interaction>
  readonly removeInteractionIds: ReadonlyArray<InteractionIds>
}

export const mapRowToRemoveBySiblingInteraction = <T>(
  { interactionMatrix, removeInteractionIds }: SupportInteractionProps,
  rowForMapping: HarpFaceRow<T>,
  rowIndex: number
): HarpFaceRow<T> => {
  const mappedRow = rowForMapping.map((item, itemIndex) => {
    const {
      [rowIndex]: { [itemIndex]: siblingInteraction },
    } = interactionMatrix
    if (siblingInteraction !== undefined) {
      if (removeInteractionIds.includes(siblingInteraction.id)) return undefined
      return item
    }
    if (item !== undefined) throw Error(errorMessage)
    return item
  })
  return mappedRow
}
