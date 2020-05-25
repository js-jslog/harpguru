# HarpStrata
A library for generating a layered representation of various harmonica layouts played in various positions

## Overview
A harp strata represents the various interactions possible on each hole on the face of a harmonica. The interactions which are possible as well as the note which is played is governed by the harmonica layout and key, and the role that note plays in the scale range depends on this position the harmonica is being played in.

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
- There is in principle no restriction on the number of holes which might be presented
- Any `undefined` values in the matrix represents interactions with holes which are not possible (for instance, a triple bend on hole 1 of a traditional major diatonic harmonica)


## Key concepts
### Apparatus
The `Apparatus` is the physical harp which is being represented. The relative pitch relationships as well as the types of bends which are availble on each hole is governed by the `Apparatus` you are using.

### Interaction
`Interaction` is the name given to the way in which you get various pitches from a single hole. All holes have at least a blow and a draw `Interaction`. Others have bends of various kinds. Each of these has a name.

### Pozition
The `Pozition` the harp is played in effects the location of the root note of the harp and therefore the role that any `Interaction` has.

`Pozition` is a deliberate misspelling of the word "position". This is the result of "Position" being a reserved word in Typescript. From this point on, the word "pozition" will always be spelled with a "z".

### Pitch
`Pitch` represents the tone which is produced at each hole interaction. It is also used to identify what key a harmonica is in. This simply refers to the `Pitch` which is at the first position root degree.

### IsActive
Represents whether the given position in the matrix is considered active or not. Making holes active / inactive represents whether they are important for the current view on the harp. The consuming library will benefit from highlighting the active ones. For example, a user considering a major pentatonic scale will want to only see the relevant holes highlighted.

### HarpStrata
A composition of all of the above concepts representing a particular harp being viewed in a particular way. All of the input variables are also included in the HarpStrata so that we know how to produce the same HarpStrata again.

## API
### getHarps() => ApparatusIds[]
Returns an array of id's of the various `Apparatus` objects which can be represented with HarpStrata. The id from which can be fed in to the `getHarpStrata` next.

### getPitchIds(?PitchIds) => PitchIds[]
Returns an array of id's of the complete list of `PitchIds` which exist in an octave. The id from which can be fed in to the `getHarpStrata` next. A `PitchIds` parameter can optionally be provided to indicate what the origin id of the list should be.

### getPozitionIds(?PozitionIds) => PozitionIds[]
Returns an array of id's of the complete list of `PozitionIds` which can be taken on a harp. The id from which can be fed in to the `getHarpStrata` next. A `PozitionIds` parameter can optionally be provided to indicate what the origin id of the list should be.

### getCovariants(CovariantControlVars) => CovariantGroup
Returns the complete set of covariant variables given any combination of 2 inputs. The covariant variables are harp key, root pitch and pozition. Given any two of these the third can be deduced.

### getHarpStrata(HarpStrataProps) => HarpStrata
Requires an `ApparatusIds` id object as well as a `PozitionIds`, `PitchIds` and `ActiveIds` object from which to deduce the `DegreeMatrix`, `PitchMatrix` and `IsActiveComplex` components of the returned `HarpStrata`.
