import 'reactn'
import type { HarpStrata, ActiveDegreeIds, ActivePitchIds } from 'harpstrata'
import type { Degree, DegreeIds, HarpFaceMatrix, Pitch } from 'harpparts'

import type { DisplayModes, ExperienceModes, FlushChannels } from './types'

declare module 'reactn/default' {
  export interface State {
    readonly activeHarpStrata: HarpStrata
    readonly activeExperienceMode: ExperienceModes
    readonly activeDisplayMode: DisplayModes
    readonly bufferedActivityToggles: ReadonlyArray<DegreeIds>
    readonly fragmentHarpFaceByOctaves: boolean
    readonly flushChannel: FlushChannels
    readonly activeQuizDegrees: ReadonlyArray<DegreeIds>
    readonly columnBounds: 'FIT' | readonly [number, number]
    readonly activeDegreeMatrix: HarpFaceMatrix<Degree>
    readonly activePitchMatrix: HarpFaceMatrix<Pitch>
    readonly activeDegreeIds: ActiveDegreeIds
    readonly activePitchIds: ActivePitchIds
    readonly viewableDegreeMatrix: HarpFaceMatrix<Degree>
    readonly viewablePitchMatrix: HarpFaceMatrix<Pitch>
  }
}

// Introduction of exploded activeHarpStrata properties
// The motivation here is to reduce the number of renders which are happening when a new harpstrata is loaded.
// Most componenets are hooked in to the `activeHarpStrata` global state and most actions update that object.
// However most of those actions don't require the entire component tree to update. Exploding the variables out
// will make it possible for the components to hook in to just the part of the harpstrata that they care about.
// I have started making reducers carefully with unit tests but now I'm pretty confident I know where I'm going
// and my first test will be around the ActivityLegend not loading when a new apparatus is chosen, or a new
// position is chosen while pitches are displayed rather than the degrees. I want to get to that test asap
// even though that now means I'm going to hack together a number of reducers without tests to make that happen.
// One of the main reasons I'm making this decision is that I don't think it's too far to go to get that test,
// but I already have a strategic modification in mind for those reducers. I don't want to enact that strategic
// modification before I've tested the validity of the general idea.
// The strategic modification is that I think all of these reducers should acknowledge that they are for a shared
// purpose and use only the same parameter inputs as a result (the new activeHarpStrata). They may need to perform
// similar tasks to get to the variable they are producing (for example the layout facts and the viewable degree matrix
// reducers will both need to derive the viewable degree matrix as part of their process. This and basically every
// other detailed process should be farmed out to a util. The main function of the reducers should just be to test
// the equality of the previous and the next value to make sure that if they are identical, the original value (or
// possibly no value) is returned.
// The utils should share a naming convention so that it's clear that they are associated. Something like this for
// the reducers and the utils is probably warranted:
//
// reduce-new-harpstrata-for-degree-matrix
// reduce-new-harpstrata-for-pitch-matrix
// reduce-new-harpstrata-for-column-bounds <- and this should be different to reduce-new-zoom-id-for-column-bounds which will use the same util function but not actually be the same reducer
// global-and-harpstrata-to-degree-matrix <- which will obviously be really simple, but will protect against future change
// global-and-harpstrata-to-column-bounds <- which will actually make use of the global object to determine what the existing columnBounds are and whether they should be changed
//
// All of those reducers are really just in service of the main `reduce-new-harpstrata` reducer function and should probably just be local to it's folder definition.
// All of the global-and-harpstrata... functions can probably identify themselves as meeting a contract, either as a type or interface
// We should also have comparison functions which will operate to simplify the comparison task required in the reducer itself
// compare-column-bounds
// ... we actually already have the matrix comparison and the row comparison is just a subcategory of that

// Introduction of columnBounds
// 1. Should be evaulated every time the activeHarpStrata is updated so that it stays reasonably in sync
//   - 'FIT' should always remain
//   - if the upper column bound extends above final hole, both column bounds should be reduced until that zoom level fits in the harp
//   - if the column bounds is too wide for the new harp, then the column bounds should just be set to 'FIT'. We'll see whether some other behaviour is preferable, but I think this is an edge case..
//
// 2. Should be used in the `getHarpFaceFacts`
//   - this will change it to `useHarpFaceFacts`
//   - not necessarily. The activeHarpStrata is already passed in without it being a hook
//
// 3. Should be used in the sizing scheme
//   - if the option is 'FIT' then the total columns and rows will be considered as they are at the moment. If it is a columnBounds then it will ignore the row number and just concentrate on getting the right number of columns in
//   - in the future we might consider offsetting the y axis so that we don't waste empty space
//
// NO LONGER REQUIRED ~4. Should be used in `HoleNumberRow`, add the columnBounds[0] value to all of the numbers in the xRange array~
//
// 5. Solve the problem of where to represent the trimmed matrices
//   - we could trim the matrices as they are being represented in the harpface. The problem here is that everything which uses `activeHarpStrata` potentially needs to be aware of the fact that it's getting trimmed during presentation
//     - HarpCell receives an xRange from the HarpFace. This xRange could be modified so that it starts at a higher index perhaps.. and then we wouldn't need to make point 4 above.
//     - The dynamic sizing in useSizes would need to consider columnBounds
//     - The HarpFace needs access to the whole degreeMatrix during `getHarpFaceFacts` in order to make the correct octave grouping decisions. This is not an argument for this approach over the next approach, but it's worth noting.
//     - It's looking like if the xRange in `harpFaceFragmentProps` is set appropriately then everything else might follow, and the other other place which needs to know about the fact the face is being truncated is the sizing scheme.
//   - we could create additional global variables which are synced with the contents of the activeHarpStrata. This might have the benefit of fewer renders since currently many components rerender because the `activeHarpStrata` rerenders, even though the bit they are concerned with has not changed. I think react actually optimises such that this isn't significant though, and what's proposed here is a significant rewiring which could take time and end up with new bugs.
//   - the interactionMatrix is not a factor because it's only used on a row by row basis at the moment for determining blow & draw rows. If it were used more frequently then we would need to bring columnBounds awareness to the table.
//     - a good place to test this would be in the ActivityLegend. Another might be in the HarpFace itself, but that's already memoised.
//
//
//     CONCLUSION
//     I haven't had to look in to the splitting out of the activeHarpStrata in to more global state in much detail because the less risky option seems to be managable and maintainable enough following the analysis in point 5.
//
//     The next step is to draft this very quickly by introducing a columnBounds value, and having it be observed in the xRange value passed down to HarpFaceFragment, and in the useSizes hook. If things look like they are working as a result then we can look at adding a UI component to control it.
//
//     - TODO: create an issue to consider this as an enhancement once the functionality works. There's more risk, but if it works I think it will be more semantic to have everything explicitly using either the whole degreeMatrix or a zoomedDegreeMatrix (or whatever).
