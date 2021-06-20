# HarpStrata

A library for generating a layered representation of various harmonica layouts played in various positions

## Overview

A harp strata represents the various interactions possible on each hole on the face of a harmonica. The interactions which are possible as well as the note which is played is governed by the harmonica layout and key, and the role that note plays in the scale range depends on this position the harmonica is being played in.

#### Example

|             | hole1 | hole2 | hole3 | hole4 |
| ----------- | ----- | ----- | ----- | ----- |
| overblow    | b3    | -     | -     | b3    |
| **blow**    | **1** | **3** | **5** | **1** |
| **draw**    | **2** | **5** | **7** | **2** |
| single bend | b2    | b5    | b7    | b2    |
| double bend | -     | 4     | 6     | -     |
| triple bend | -     | -     | b6    | -     |

The matrix at the centre of this table is analogous to one of the representations being discussed. Each hole has multiple possible interactions, and each possible interaction will yield a particular scale degree note.

This matrix represents the first 4 holes of a major diatonic harmonica being played in first position.

### HarpMatrix contract

The assumptions which will hold of all layouts presented from this library are the following:

- Elements at position `[0, x]` represent the interactions with the first hole on the harmonica
- Elements in the array to the right of the 0 column represent interactions with the holes sequentially to the right
- There is in principle no restriction on the number of holes which might be presented
- Any `undefined` values in the matrix represents interactions with holes which are not possible (for instance, a triple bend on hole 1 of a traditional major diatonic harmonica)

## API

### getHarpStrata(HarpStrataProps) => HarpStrata

Requires a `TuningIds` id object as well as a `PozitionIds`, `PitchIds` and `ActiveIds` object from which to deduce the `DegreeMatrix` and `PitchMatrix` components of the returned `HarpStrata`. Will also determine the counterpart active ids for any `Degree` or `Pitch` set given in `ActiveIds`.

### getPropsForHarpStrata(HarpStrata, 'DEGREE' | 'PICH') => HarpStrataProps

Requires a `HarpStrata` from which to identify the props which would have produced it from a call to `getHarpStrata`. Since either a set of `Degree`'s or `Pitch`'s could have been used to produce any given `HarpStrata`, the function also requests identification of which of these `ActiveIds` should be presumed to be used.

# Pre-monorepo origins

This package was imported from the head of a feature branch from a dedicated (and published) package called harpstrata.

[This is the pull request with all of the commits relating to the move to a monorepo architecture](https://github.com/js-jslog/harpstrata/pull/39)

There is a long explanation about the branch and it's purpose in [this commit](https://github.com/js-jslog/harpstrata/pull/39/commits/7a429452036ef2c620958e86d877a611f59e6edd)
