import { reduceToStaticSizes } from '../reduce-to-staticsizes'
import { reduceLayoutFactsToDynamicSizes } from '../reduce-layoutfacts-to-dynamicsizes'
import type { HarpGuruState } from '../../store'

type SizeFields = Pick<HarpGuruState, 'dynamicSizes' | 'staticSizes'>

// The sizes for the space the harp face now has, keeping each previous value
// when nothing has changed.
export const reduceToResizedSizes = (state: HarpGuruState): SizeFields => ({
  dynamicSizes: reduceLayoutFactsToDynamicSizes(
    state.dynamicSizes,
    { fullLayoutFacts: state.fullLayoutFacts, layoutFacts: state.layoutFacts },
    state.frameDimensions
  ),
  staticSizes: reduceToStaticSizes(state.staticSizes, state.frameDimensions),
})
