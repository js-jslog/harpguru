import type { LayoutFacts } from '../../../../types'

export const isMatchLayoutFacts = (
  facts1: LayoutFacts,
  facts2: LayoutFacts
): boolean => {
  const { harpfaceRows: rows1, harpfaceColumns: columns1 } = facts1
  const { harpfaceRows: rows2, harpfaceColumns: columns2 } = facts2

  return rows1 === rows2 && columns1 === columns2
}
