import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { deriveLayoutFacts } from '../../utils'
import { compareLayoutFacts } from '../../../../utils/compare-layout-facts'

export const useDeriveLayoutFacts = (): void => {
  // TODO: should be based on the less volatile interaction matrix
  const [viewableDegreeMatrix] = useGlobal('viewableDegreeMatrix')
  const [prevLayoutFacts, setLayoutFacts] = useGlobal('layoutFacts')

  useEffect(() => {
    const nextLayoutFacts = deriveLayoutFacts(viewableDegreeMatrix)
    if (compareLayoutFacts(prevLayoutFacts, nextLayoutFacts)) return
    console.log(':::::::::::::::::::::::::::::::::: layout facts changed')
    setLayoutFacts(nextLayoutFacts)
  }, [viewableDegreeMatrix])
}
