import type { DegreeIds } from 'harpparts'

import { useHarpGuruStore } from '../../../../store'

type BufferToggleFunction = (arg0: DegreeIds) => void

export const useAddBufferedActivityToggle = (): BufferToggleFunction => {
  const bufferedActivityToggles = useHarpGuruStore(
    (state) => state.bufferedActivityToggles
  )
  const setBufferedActivityToggles = useHarpGuruStore(
    (state) => state.setBufferedActivityToggles
  )

  return (toggleToBuffer) => {
    if (bufferedActivityToggles.includes(toggleToBuffer)) {
      setBufferedActivityToggles([...bufferedActivityToggles])
    } else {
      setBufferedActivityToggles([...bufferedActivityToggles, toggleToBuffer])
    }
  }
}
