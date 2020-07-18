import 'reactn'
import type { HarpStrata } from 'harpstrata'

declare module 'reactn/default' {
  export interface State {
    activeHarpStrata: HarpStrata
  }
}
