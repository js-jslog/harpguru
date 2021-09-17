import { useGlobal } from 'reactn'
import type { Degree, HarpFaceMatrix } from 'harpparts'

type ViewableMatrices = {
  viewableDegreeMatrix: HarpFaceMatrix<Degree>
}

export const useViewableMatrices = (): ViewableMatrices => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')

  return {
    viewableDegreeMatrix: activeHarpStrata.degreeMatrix,
  }
}
