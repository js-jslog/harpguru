import type { DegreeIds } from 'harpparts'

export const toggleDegreeInList = (
  inputList: ReadonlyArray<DegreeIds>,
  toggleDegree: DegreeIds
): ReadonlyArray<DegreeIds> => {
  if (inputList.includes(toggleDegree)) {
    return inputList.filter((item) => item !== toggleDegree)
  }
  return [...inputList, toggleDegree]
}
