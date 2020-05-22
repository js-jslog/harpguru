import type { HarpStrata } from 'harpstrata'

export type HarpStrataControlProps = {
  readonly activeHarpStrata: HarpStrata;
  readonly setActiveHarpStrata: (harpStrata: HarpStrata) => void;
}
