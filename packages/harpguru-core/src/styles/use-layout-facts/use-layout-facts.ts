import { useViewableMatrices } from '../../components/harp-face-fragment/hooks/use-viewable-matrices'

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
