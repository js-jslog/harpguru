type LayoutFacts = {
  readonly harpfaceColumns: number
  readonly harpfaceRows: number
}

export const compareLayoutFacts = (
  facts1: LayoutFacts,
  facts2: LayoutFacts
): boolean => {
  return Object.is(facts1, facts2)
}
