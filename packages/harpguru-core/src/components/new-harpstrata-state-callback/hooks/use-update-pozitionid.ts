import { useGlobal } from 'reactn'
import { useEffect } from 'react'

export const useUpdatePozitionId = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [pozitionId, setPozitionId] = useGlobal('pozitionId')

  useEffect(() => {
    if (pozitionId === activeHarpStrata.pozitionId) return
    console.log(
      ':::::::::::::::::::::::::::::::::: pozitionId changed: :' + pozitionId
    )
    setPozitionId(activeHarpStrata.pozitionId)
  }, [activeHarpStrata, pozitionId, setPozitionId])
}
