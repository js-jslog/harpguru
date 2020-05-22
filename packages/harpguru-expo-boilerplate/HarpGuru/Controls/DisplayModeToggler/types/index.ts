import type { DisplayModes } from '../../../HarpFace'

export type DisplayModeTogglerProps = {
  readonly setActiveDisplayMode: (displayMode: DisplayModes) => void;
}
