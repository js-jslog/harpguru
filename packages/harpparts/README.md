# HarpParts

A library of concepts from which to build models of harmonicas.

## Overview

The parts of a harmonica which are important to the model are the _structure_ of the harmonica and how the holes in that structure relate to each other tonally, as well as the tones themselves, as considered from the scale and pitch perspective. Finally, we desperately need to capture the way that positional playing acts as an interface between the scale degree and pitch perspectives of the harmonica's parts.

## Key concepts

### Apparatus

The `Apparatus` is the physical harp which is being represented. The relative pitch relationships as well as the types of bends which are availble on each hole is governed by the `Apparatus` you are using.

### Pozition

The `Pozition` the harp is played in effects the location of the root note of the harp and therefore the role that any `Interaction` has.

`Pozition` is a deliberate misspelling of the word "position". This is the result of "Position" being a reserved word in Typescript. From this point on, the word "pozition" will always be spelled with a "z".

### Pitch

`Pitch` represents the tone which is produced at each hole interaction. It is also used to identify what key a harmonica is in. This simply refers to the `Pitch` which is at the first position root degree.

### Degree

`Degree` represents the tone which is produced at each hole interaction, as considered from the context of a scale.

### HarpFaceMatrix

A matrix of harp parts, identifying which are relevant at any given hole interaction position on a harmonica.

### Interaction

`Interaction` is the name given to the way in which you get various pitches from a single hole. All holes have at least a blow and a draw `Interaction`. Others have bends of various kinds. Each of these has a name.

### HalfstepIndex

A representation of how each hole interaction on a harp relates to the others tonally, where 0 is the lowest tone the harp can play. An index represents a half-step pitch change.

## API

### get\<XXX\>Ids(?origin)

Returns an ordered array of the enumerated ids of available harp parts. Available for `Apparatus`, `Degree`, `Pitch` & `Pozition`. Use eg `getPozitionIds`.

The optional `origin` argument will give you the entire list with the origin set to a particular value in the list or throw and error if an unavailable value is input.

### get\<XXX\>(id)

Returns an instance of a harp part. You can get the available id's for input from the `get<XXX>Ids` function.

### getPozitionByOffset(offset)

Returns the `Pozition` object which would apply at a given offset from the harp's first position root. Used for determining which `Pozition` would apply if we were to start playing with any given hole as the root on any given `Apparatus`.

### reversePreserveOrigin([])

Reverses a generic array while preserving the element at index 0. Useful for getting a descending version of an array returned from the `get<XXX>Ids` above.

# Split from harpstrata

This package was created as a fragmentation of functionality from the harpstrata package.
