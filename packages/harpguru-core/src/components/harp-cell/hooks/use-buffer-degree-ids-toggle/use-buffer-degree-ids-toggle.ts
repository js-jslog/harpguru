import { useGlobal } from 'reactn'
import type { DegreeIds } from 'harpstrata'

type BufferToggleFunction = (arg0: DegreeIds) => void

export const useBufferDegreeIdsToggle = (): BufferToggleFunction => {
  const [bufferedActivityToggles, setBufferedActivityToggles] = useGlobal(
    'bufferedActivityToggles'
  )

  return (toggleToBuffer) => {
    if (bufferedActivityToggles.includes(toggleToBuffer)) {
      setBufferedActivityToggles([...bufferedActivityToggles])
    } else {
      setBufferedActivityToggles([...bufferedActivityToggles, toggleToBuffer])
    }
  }
}
