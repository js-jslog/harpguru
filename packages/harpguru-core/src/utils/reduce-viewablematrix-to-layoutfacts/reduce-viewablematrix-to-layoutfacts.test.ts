import { reduceViewableMatrixToLayoutFacts } from './reduce-viewablematrix-to-layoutfacts'

const viewableMatrix = {
  harpface1: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
}

test('the previous layoutFacts are returned if they match the derived ones', () => {
  const prevLayoutFacts = {
    harpface1: {
      harpfaceColumns: 10,
      harpfaceRows: 4,
    },
  } as const
  expect(
    reduceViewableMatrixToLayoutFacts(prevLayoutFacts, viewableMatrix)
  ).toBe(prevLayoutFacts)
})

test('an appropriate layoutFacts is returned for a given viewableMatrix', () => {
  const prevLayoutFacts = {
    harpface1: {
      harpfaceColumns: 1,
      harpfaceRows: 1,
    },
  } as const
  const expectedLayoutFacts = {
    harpface1: {
      harpfaceColumns: 10,
      harpfaceRows: 4,
    },
  } as const
  expect(
    reduceViewableMatrixToLayoutFacts(prevLayoutFacts, viewableMatrix)
  ).toStrictEqual(expectedLayoutFacts)
})
