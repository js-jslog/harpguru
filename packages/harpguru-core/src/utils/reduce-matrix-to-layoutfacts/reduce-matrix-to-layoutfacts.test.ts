import { reduceMatrixToLayoutFacts } from './reduce-matrix-to-layoutfacts'

const viewableMatrixChromatic = {
  harpface1: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  harpface2: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
}
const viewableMatrixDiatonic = {
  harpface1: viewableMatrixChromatic.harpface1,
}

test('the previous layoutFacts are returned if they match the derived ones', () => {
  const prevLayoutFactsDiatonic = {
    harpface1: {
      harpfaceColumns: 10,
      harpfaceRows: 4,
    },
  } as const
  const prevLayoutFactsChromatic = {
    harpface1: {
      harpfaceColumns: 10,
      harpfaceRows: 4,
    },
    harpface2: {
      harpfaceColumns: 10,
      harpfaceRows: 2,
    },
  } as const
  expect(
    reduceMatrixToLayoutFacts(prevLayoutFactsDiatonic, viewableMatrixDiatonic)
  ).toBe(prevLayoutFactsDiatonic)
  expect(
    reduceMatrixToLayoutFacts(prevLayoutFactsChromatic, viewableMatrixChromatic)
  ).toBe(prevLayoutFactsChromatic)
})

test('an appropriate layoutFacts is returned for a given viewableMatrix', () => {
  const prevLayoutFactsDiatonic = {
    harpface1: {
      harpfaceColumns: 10,
      harpfaceRows: 4,
    },
  } as const
  const prevLayoutFactsChromatic = {
    harpface1: {
      harpfaceColumns: 10,
      harpfaceRows: 4,
    },
    harpface2: {
      harpfaceColumns: 10,
      harpfaceRows: 2,
    },
  } as const
  const expectedLayoutFactsDiatonic = {
    harpface1: {
      harpfaceColumns: 10,
      harpfaceRows: 4,
    },
  } as const
  const expectedLayoutFactsChromatic = {
    harpface1: {
      harpfaceColumns: 10,
      harpfaceRows: 4,
    },
    harpface2: {
      harpfaceColumns: 10,
      harpfaceRows: 2,
    },
  } as const
  expect(
    reduceMatrixToLayoutFacts(prevLayoutFactsChromatic, viewableMatrixDiatonic)
  ).toStrictEqual(expectedLayoutFactsDiatonic)
  expect(
    reduceMatrixToLayoutFacts(prevLayoutFactsDiatonic, viewableMatrixChromatic)
  ).toStrictEqual(expectedLayoutFactsChromatic)
})
