import 'reactn'
import type { HarpStrata } from 'harpstrata'
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
    readonly viewableDegreeMatrix: HarpFaceMatrix<Degree>
  }
}

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
