import { useViewableMatrices } from '../use-viewable-matrices'

type LayoutFacts = {
  harpFaceRowCount: number
  harpFaceColumnCount: number
}

export const useLayoutFacts = (): LayoutFacts => {
  const { viewableDegreeMatrix } = useViewableMatrices()
  const { length: harpFaceRowCount } = viewableDegreeMatrix
  const { [0]: exampleHarpRow } = viewableDegreeMatrix
  const { length: harpFaceColumnCount } = exampleHarpRow

  return {
    harpFaceRowCount,
    harpFaceColumnCount,
  }
}
