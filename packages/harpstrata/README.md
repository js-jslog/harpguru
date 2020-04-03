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
### getLayouts() => string[]
Returns an array of the names of the layouts which are available for input in to the `getHarpMatrix` function's first parameter.

### getHarpMatrix(layout: string, offset: number) => [harpmatrix: Degree[], blowrow: number]
Requires a layout parameter selected as one of the return values of `getLayouts` above, and an offset number representing the number of scale degrees up from the first position layout is required. This offset indirectly represents the position in which the harp is being played.

Returns a matrix of Degree type objects and a number representing which row in the matrix represents the blow row.

It can be inferred that the row below the blow row is the draw row and that the rows above and below those are the (overblow / blowbend) & (bend / overdraw) rows, respectively, of their various extremes.

There is currently no way to distinguish between bend vs overdraw's or overblow vs blowbends.
