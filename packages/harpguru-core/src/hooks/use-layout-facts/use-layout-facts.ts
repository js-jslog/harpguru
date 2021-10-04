import { useGlobal } from 'reactn'

type LayoutFacts = {
  harpFaceRowCount: number
  harpFaceColumnCount: number
}

export const useLayoutFacts = (): LayoutFacts => {
  const [viewableInteractionMatrix] = useGlobal('viewableInteractionMatrix')
  const { length: harpFaceRowCount } = viewableInteractionMatrix
  const { [0]: exampleHarpRow } = viewableInteractionMatrix
  const { length: harpFaceColumnCount } = exampleHarpRow

  return {
    harpFaceRowCount,
    harpFaceColumnCount,
  }
}
