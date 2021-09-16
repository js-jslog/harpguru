import 'reactn'
import type { HarpStrata } from 'harpstrata'
import type { DegreeIds } from 'harpparts'

import type { DisplayModes, ExperienceModes, FlushChannels } from './types'

declare module 'reactn/default' {
  export interface State {
    activeHarpStrata: HarpStrata
    activeExperienceMode: ExperienceModes
    activeDisplayMode: DisplayModes
    bufferedActivityToggles: ReadonlyArray<DegreeIds>
    fragmentHarpFaceByOctaves: boolean
    flushChannel: FlushChannels
    activeQuizDegrees: ReadonlyArray<DegreeIds>
    // columnBounds: 'FIT' | [ number, number ]
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
//
// 3. Should be used in the sizing scheme
//   - if the option is 'FIT' then the total columns and rows will be considered as they are at the moment. If it is a columnBounds then it will ignore the row number and just concentrate on getting the right number of columns in
//   - in the future we might consider offsetting the y axis so that we don't waste empty space
//
// 4. Should be used in `HoleNumberRow`, add the columnBounds[0] value to all of the numbers in the xRange array
//
// 5. Solve the problem of where to represent the trimmed matrices
//   - we could trim the matrices as they are being represented in the harpface. The problem here is that everything which uses `activeHarpStrata` potentially needs to be aware of the fact that it's getting trimmed during presentation
//   - we could create additional global variables which are synced with the contents of the activeHarpStrata. This might have the benefit of fewer renders since currently many components rerender because the `activeHarpStrata` rerenders, even though the bit they are concerned with has not changed. I think react actually optimises such that this isn't significant though, and what's proposed here is a significant rewiring which could take time and end up with new bugs.
