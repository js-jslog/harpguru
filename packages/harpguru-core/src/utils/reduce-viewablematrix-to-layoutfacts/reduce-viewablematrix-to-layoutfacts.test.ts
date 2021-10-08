import { reduceViewableMatrixToLayoutFacts } from './reduce-viewablematrix-to-layoutfacts'

test('an appropriate layoutFacts is returned for a given viewableMatrix', () => {
  //const prevLayoutFacts = {
  //  harpfaceColumns: 1,
  //  harpfaceRows: 1
  //}
  const viewableMatrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]
  const expectedLayoutFacts = {
    harpfaceColumns: 10,
    harpfaceRows: 4,
  }
  expect(
    reduceViewableMatrixToLayoutFacts(
      //prevLayoutFacts,
      viewableMatrix
    )
  ).toStrictEqual(expectedLayoutFacts)
})
