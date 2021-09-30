import { useGlobal } from 'reactn'
import { useEffect } from 'react'

export const useUpdateRootPitchId = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [rootPitchId, setRootPitchId] = useGlobal('rootPitchId')

  useEffect(() => {
    if (rootPitchId === activeHarpStrata.rootPitchId) return
    console.log(
      ':::::::::::::::::::::::::::::::::: rootPitchId changed: :' + rootPitchId
    )
    setRootPitchId(activeHarpStrata.rootPitchId)
  }, [activeHarpStrata, rootPitchId, setRootPitchId])
}
