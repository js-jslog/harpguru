# HarpStrata
A library for generating a layered representation of various harmonica layouts played in various positions

## Overview
A harp strata represents the various interactions possible on each hole on the face of a harmonica. The interactions which are possible as well as the note (unimplemented) which is played is governed by the harmonica layout, and the role that note plays in the scale range depends on this position the harmonica is being played in.

#### Example
||hole1|hole2|hole3|hole4|
|---|---|---|---|---|
|overblow|b3|-|-|b3|
|**blow**|**1**|**3**|**5**|**1**|
|**draw**|**2**|**5**|**7**|**2**|
|single bend|b2|b5|b7|b2|
|double bend|-|4|6|-|
|triple bend|-|-|b6|-|

The matrix at the centre of this table is analogous to one of the representations being discussed. Each hole has multiple possible interactions, and each possible interaction will yield a particular scale degree note.

This matrix represents the first 4 holes of a major diatonic harmonica being played in first position.

### HarpMatrix contract
The assumptions which will hold of all layouts presented from this library are the following:
- Elements at position `[0, x]` represent the interactions with the first hole on the harmonica
- Elements in the array to the right of the 0 column represent interactions with the holes sequentially to the right
- There is effectively no restriction on the number of holes which might be presented
- Any `undefined` values in the matrix represents interactions with holes which are not possible (for instance, a triple bend on hole 1 of a traditional major diatonic harmonica)


## Key concepts
### Apparatus
The `Apparatus` is the physical harp which is being represented. The relative pitch relationships as well as the types of bends which are availble on each hole is governed by the `Apparatus` you are using.

### Interaction
`Interaction` is the name given to the way in which you get various pitches from a single hole. All holes have at least a blow and a draw `Interaction`. Others have bends of various kinds. Each of these has a name.
// TODO: rather than documenting each of the types and enumerations, we should ellaborate the getter functions to provide sufficient documentation on the types and what they are for

### Pozition
The `Pozition` the harp is played in effects the location of the root note of the harp and therefore the role that any `Interaction` has.

`Pozition` is a deliberate misspelling of the word "position". This is the result of "Position" being a reserved word in Typescript. From this point on, the word "pozition" will always be spelled with a "z".

### HarpStrata
A composition of a hardcoded `Apparatus` object and a map of the `Degrees` which map on to each `Interaction` therein.

## API
### getHarps() => ApparatusIds[]
Returns an array of id's of the various `Apparatus` objects which can be represented with HarpStrata. The id from which can be fed in to the `getHarpStrata` next.

### getPozitionIds() => PozitionIds[]
Returns an array of id's of the various `Pozition` objects which can be represented with HarpStrata. The id from which can be fed in to the `getHarpStrata` next.

### getHarpStrata(apparatusId: ApparatusIds, pozitionId: PozitionIds) => HarpStrata
Requires an `ApparatusIds` id object as well as a `PozitionIds` id object from which to deduce the `DegreeMatrix` component of the returned `HarpStrata`.

