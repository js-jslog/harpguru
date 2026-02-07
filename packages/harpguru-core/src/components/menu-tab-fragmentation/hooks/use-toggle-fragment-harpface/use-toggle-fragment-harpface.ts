import { useHarpGuruStore } from '../../../../store'

export const useToggleFragmentHarpFace = (): (() => void) => {
  const fragmentHarpFaceByOctaves = useHarpGuruStore(
    (state) => state.fragmentHarpFaceByOctaves
  )
  const setFragmentHarpFaceByOctaves = useHarpGuruStore(
    (state) => state.setFragmentHarpFaceByOctaves
  )
  return () => setFragmentHarpFaceByOctaves(!fragmentHarpFaceByOctaves)
}
