import { DegreeIds } from 'harpstrata'

import { arrayHasRoot } from './index'

test('Reduce a single row matrix to identify whether it contains any roots', () => {
  const degreeMatrix = [
    [
      { id: DegreeIds.Root },
      { id: DegreeIds.Second },
      { id: DegreeIds.Fourth },
    ],
  ]
  const expectedRootsMatrix = [true]

  const actualRootsMatrix = degreeMatrix.map(arrayHasRoot)

  expect(actualRootsMatrix).toStrictEqual(expectedRootsMatrix)
})

test('Reduce a multidimensional simple degreeMatrix to identify which rows have roots', () => {
  const degreeMatrix = [
    [
      { id: DegreeIds.Root },
      { id: DegreeIds.Second },
      { id: DegreeIds.Fourth },
    ],
    [{ id: DegreeIds.Root }, undefined, { id: DegreeIds.Root }],
    [{ id: DegreeIds.Second }, undefined, { id: DegreeIds.Third }],
  ]
  const expectedRootsMatrix = [true, true, false]

  const actualRootsMatrix = degreeMatrix.map(arrayHasRoot)

  expect(actualRootsMatrix).toStrictEqual(expectedRootsMatrix)
})
