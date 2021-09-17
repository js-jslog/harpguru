import { useGlobal } from 'reactn'

type LayoutFacts = {
  harpFaceRowCount: number
  harpFaceColumnCount: number
}

export const useLayoutFacts = (): LayoutFacts => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { degreeMatrix } = activeHarpStrata
  const { length: harpFaceRowCount } = degreeMatrix
  const { [0]: exampleHarpRow } = degreeMatrix
  const { length: harpFaceColumnCount } = exampleHarpRow

  return {
    harpFaceRowCount,
    harpFaceColumnCount,
  }
}
