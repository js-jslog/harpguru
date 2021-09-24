import { DegreeIds, getDegree } from 'harpparts'

import { arrayHasRoot } from './array-has-root'

test('Reduce a single row matrix to identify whether it contains any roots', () => {
  const degreeMatrix = [
    [
      getDegree(DegreeIds.Root),
      getDegree(DegreeIds.Second),
      getDegree(DegreeIds.Fourth),
    ],
  ]
  const expectedRootsMatrix = [true]

  const actualRootsMatrix = degreeMatrix.map(arrayHasRoot)

  expect(actualRootsMatrix).toStrictEqual(expectedRootsMatrix)
})

test('Reduce a multidimensional simple degreeMatrix to identify which rows have roots', () => {
  const degreeMatrix = [
    [
      getDegree(DegreeIds.Root),
      getDegree(DegreeIds.Second),
      getDegree(DegreeIds.Fourth),
    ],
    [getDegree(DegreeIds.Root), undefined, getDegree(DegreeIds.Root)],
    [getDegree(DegreeIds.Second), undefined, getDegree(DegreeIds.Third)],
  ]
  const expectedRootsMatrix = [true, true, false]

  const actualRootsMatrix = degreeMatrix.map(arrayHasRoot)

  expect(actualRootsMatrix).toStrictEqual(expectedRootsMatrix)
})
