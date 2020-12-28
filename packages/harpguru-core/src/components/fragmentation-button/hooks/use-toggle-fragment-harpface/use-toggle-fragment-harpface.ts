import { useGlobal } from 'reactn'

export const useToggleFragmentHarpFace = (): (() => void) => {
  const [fragmentHarpFaceByOctaves, setFragmentHarpFaceByOctaves] = useGlobal(
    'fragmentHarpFaceByOctaves'
  )
  return () => setFragmentHarpFaceByOctaves(!fragmentHarpFaceByOctaves)
}
