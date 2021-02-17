import { DegreeIds } from 'harpparts'

import { arrayHasRoot } from './array-has-root'

test('Reduce a single row matrix to identify whether it contains any roots', () => {
  const degreeMatrix = [
    [
      { id: DegreeIds.Root, simpleSplitValue: ['1', ''] as [string, string] },
      { id: DegreeIds.Second, simpleSplitValue: ['2', ''] as [string, string] },
      { id: DegreeIds.Fourth, simpleSplitValue: ['4', ''] as [string, string] },
    ],
  ]
  const expectedRootsMatrix = [true]

  const actualRootsMatrix = degreeMatrix.map(arrayHasRoot)

  expect(actualRootsMatrix).toStrictEqual(expectedRootsMatrix)
})

test('Reduce a multidimensional simple degreeMatrix to identify which rows have roots', () => {
  const degreeMatrix = [
    [
      { id: DegreeIds.Root, simpleSplitValue: ['1', ''] as [string, string] },
      { id: DegreeIds.Second, simpleSplitValue: ['2', ''] as [string, string] },
      { id: DegreeIds.Fourth, simpleSplitValue: ['4', ''] as [string, string] },
    ],
    [
      { id: DegreeIds.Root, simpleSplitValue: ['1', ''] as [string, string] },
      undefined,
      { id: DegreeIds.Root, simpleSplitValue: ['1', ''] as [string, string] },
    ],
    [
      { id: DegreeIds.Second, simpleSplitValue: ['2', ''] as [string, string] },
      undefined,
      { id: DegreeIds.Third, simpleSplitValue: ['3', ''] as [string, string] },
    ],
  ]
  const expectedRootsMatrix = [true, true, false]

  const actualRootsMatrix = degreeMatrix.map(arrayHasRoot)

  expect(actualRootsMatrix).toStrictEqual(expectedRootsMatrix)
})
