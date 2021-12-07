import { getIfZoomedColumnBounds } from './get-ifzoomed-columnbounds'

test('A fit columnbounds is never zoomed', () => {
  const columnBounds = 'FIT'
  const layoutFacts1 = {
    harpfaceRows: 10,
    harpfaceColumns: 10,
  }
  expect(getIfZoomedColumnBounds(layoutFacts1, columnBounds)).toBeFalsy()
  const layoutFacts2 = {
    harpfaceRows: 0,
    harpfaceColumns: 0,
  }
  expect(getIfZoomedColumnBounds(layoutFacts2, columnBounds)).toBeFalsy()
  const layoutFacts3 = {
    harpfaceRows: 10000,
    harpfaceColumns: 10000,
  }
  expect(getIfZoomedColumnBounds(layoutFacts3, columnBounds)).toBeFalsy()
})

test('A pseudo-fit columnbounds is not zoomed', () => {
  const columnBounds1 = [0, 9] as const
  const layoutFacts1 = {
    harpfaceRows: 10,
    harpfaceColumns: 10,
  }
  expect(getIfZoomedColumnBounds(layoutFacts1, columnBounds1)).toBeFalsy()
  const columnBounds2 = [0, 50] as const
  const layoutFacts2 = {
    harpfaceRows: 10,
    harpfaceColumns: 10,
  }
  expect(getIfZoomedColumnBounds(layoutFacts2, columnBounds2)).toBeFalsy()
  const columnBounds3 = [0, 999999999] as const
  const layoutFacts3 = {
    harpfaceRows: 10000,
    harpfaceColumns: 10000,
  }
  expect(getIfZoomedColumnBounds(layoutFacts3, columnBounds3)).toBeFalsy()
})

test('A zoomed columnbounds is returned as is', () => {
  const columnBounds1 = [0, 8] as const
  const layoutFacts1 = {
    harpfaceRows: 10,
    harpfaceColumns: 10,
  }
  expect(getIfZoomedColumnBounds(layoutFacts1, columnBounds1)).toBe(
    columnBounds1
  )
  const columnBounds2 = [1, 50] as const
  const layoutFacts2 = {
    harpfaceRows: 10,
    harpfaceColumns: 52,
  }
  expect(getIfZoomedColumnBounds(layoutFacts2, columnBounds2)).toBe(
    columnBounds2
  )
  const columnBounds3 = [0, 2] as const
  const layoutFacts3 = {
    harpfaceRows: 10000,
    harpfaceColumns: 10000,
  }
  expect(getIfZoomedColumnBounds(layoutFacts3, columnBounds3)).toBe(
    columnBounds3
  )
})
