import { DegreeIds } from 'harpparts'

import { toggleDegreeInList } from './toggle-degree-in-list'

test('toggling a degree in a list containing only that degree returns an empty list', () => {
  const inputList = [DegreeIds.Root]
  const { Root: toggleDegree } = DegreeIds
  const expectedOutputList = [] as ReadonlyArray<DegreeIds>

  expect(toggleDegreeInList(inputList, toggleDegree)).toStrictEqual(
    expectedOutputList
  )
})

test('toggling a degree in an empty list returns a list with just that degree in it', () => {
  const inputList = [] as ReadonlyArray<DegreeIds>
  const { Root: toggleDegree } = DegreeIds
  const expectedOutputList = [toggleDegree]

  expect(toggleDegreeInList(inputList, toggleDegree)).toStrictEqual(
    expectedOutputList
  )
})
