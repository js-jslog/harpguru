import { useGlobal } from 'reactn'
import { useEffect } from 'react'

export const useUpdateHarpKeyId = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [harpKeyId, setHarpKeyId] = useGlobal('harpKeyId')

  useEffect(() => {
    if (harpKeyId === activeHarpStrata.harpKeyId) return
    console.log(
      ':::::::::::::::::::::::::::::::::: harpKeyId changed: :' + harpKeyId
    )
    setHarpKeyId(activeHarpStrata.harpKeyId)
  }, [activeHarpStrata, harpKeyId, setHarpKeyId])
}
