import { useGlobal } from 'reactn'
import type { DegreeIds } from 'harpstrata'

export const useBufferDegreeIdsToggle = (toggleToBuffer: DegreeIds): void => {
  const [toggleDegreeIdsBuffer, setToggleDegreeIdsBuffer] = useGlobal('toggleDegreeIdsBuffer')
  if (toggleDegreeIdsBuffer.includes(toggleToBuffer)) return
  setToggleDegreeIdsBuffer([...toggleDegreeIdsBuffer, toggleToBuffer])
}
