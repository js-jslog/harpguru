# harpmatrix
A library for generating matrix representations of various harmonica layouts played in various positions

## Overview
A harp matrix represents the various interactions possible on each hole on the face of a harmonica. The interactions which are possible as well as the note which is played is governed by the harmonica layout, and the role that note plays in the scale range depends on this position the harmonica is being played in.

#### Example
||hole1|hole2|hole3|hole4|
|---|---|---|---|---|
|overblow|b3|-|-|b3|
|**blow**|**1**|**3**|**5**|**1**|
|**draw**|**2**|**5**|**7**|**2**|
|single bend|b2|b5|b7|b2|
|double bend|-|4|6|-|
|triple bend|-|-|b6|-|

The matrix at the centre of this table is analogous to the matrix representation being discussed. Each hole has multiple possible interactions, and each possible interaction will yield a particular scale degree note.

This matrix represents the first 4 holes of a major diatonic harmonica being played in first position.

### HarpMatrix contract
The assumptions which will hold of all layouts presented from this library are the following:
- Elements at position `[0, x]` represent the interactions with the first hole on the harmonica
- Elements in the array to the right of the 0 column represent interactions with the holes sequentially to the right
- There is no restriction on the number of holes which might be presented
- Any `undefined` values in the matrix represents interactions with holes which are not possible (for instance, a triple bend on hole 1 of a traditional major diatonic harmonica)


## API (Unimplemented)
### getLayouts() => LayoutDescription[]
Returns an array of the layout descriptions, the id from which can be fed in to the `getHarpMatrix` next.

### getHarpMatrix(layoutId: string) => HarpMatrix ([harpmatrix: Degree[], blowrow: number])
Requires a string specifying which layout the matrix should represent, as one of the return values of `getLayouts` above.

Returns a matrix of Degree type objects and a number representing which row in the matrix represents the blow row.

The matrix represents the hole interaction scale degrees in first position. That is to say, where blowing on the 1 hole identifies the root note.

It can be inferred that the row below the blow row is the draw row and that the rows above and below those are the (overblow / blowbend) & (bend / overdraw) rows, respectively, of their various extremes.

There is currently no way to distinguish between bend vs overdraw's or overblow vs blowbends.

### getPositions() => PositionDescription[]
Returns an array of position descriptions, the offset from which can be fed in to the `offsetHarpMatrix` function below.

### offsetHarpMatrix(harpmatrix: HarpMatrix, offset: number) => HarpMatrix
Returns a mapped HarpMatrix where each of the Degree's in the array has been offset by the specified amount.

Throws an error if it appears that the function is being applied to a layout which has already been offset.

### getScales() => ScalesDescription[]
Returns an array of scale descriptions, the Degree[] from which can be fed in to the `filterHarpMatrix` function below.

### filterHarpMatrix(harpmatrix: HarpMatrix, filteredDegrees: Degrees[]) => HarpMatrix
Retruns a HarpMatrix identical to the input, but with the degrees excluded from the scale identified. The Degree[] object can be obtained from the `getScales` function above. Alternatively, an entirely bespoke Degree[] can be built.
