import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { deriveLayoutFacts } from '../../utils'
import { compareLayoutFacts } from '../../../../utils/compare-layout-facts'

export const useDeriveLayoutFacts = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [prevColumnBounds] = useGlobal('columnBounds')
  const [prevLayoutFacts, setLayoutFacts] = useGlobal('layoutFacts')

  useEffect(() => {
    const nextLayoutFacts = deriveLayoutFacts(
      activeHarpStrata,
      prevColumnBounds
    )
    if (compareLayoutFacts(prevLayoutFacts, nextLayoutFacts)) return
    console.log(':::::::::::::::::::::::::::::::::: layout facts changed')
    setLayoutFacts(nextLayoutFacts)
  }, [activeHarpStrata, prevColumnBounds, prevLayoutFacts, setLayoutFacts])
}
