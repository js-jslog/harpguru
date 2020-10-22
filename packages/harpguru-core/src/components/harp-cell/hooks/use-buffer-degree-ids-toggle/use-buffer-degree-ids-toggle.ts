import { useGlobal } from 'reactn'
import type { DegreeIds } from 'harpstrata'

type BufferToggleFunction = (arg0: DegreeIds) => void

export const useBufferDegreeIdsToggle = (): BufferToggleFunction => {
  const [toggleDegreeIdsBuffer, setToggleDegreeIdsBuffer] = useGlobal(
    'toggleDegreeIdsBuffer'
  )

  return (toggleToBuffer) => {
    if (toggleDegreeIdsBuffer.includes(toggleToBuffer)) return
    setToggleDegreeIdsBuffer([...toggleDegreeIdsBuffer, toggleToBuffer])
  }
}
