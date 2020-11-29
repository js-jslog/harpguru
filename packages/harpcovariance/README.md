# HarpCovariance

A library for modeling the covarying relationship between the `Degree`, `Pitch` and `Pozition` concepts on a harmonica.

## API

### getCovariantSet(controlVariables)

Returns a set of `Degree`, `Pitch` and `Pozition` which are correlated given an input of just 2 of them (the control variables). That is to say that if you give this function 2 of the variables, it will be able to tell you what the dependent variable resulting from them would be.

## Unused functionality

There is a `getCovarianceSeries` function which is not exported from this package as it's currently unused. It's function is to produce a series of `CovariantSet`'s given some primer variables. It is detailed functionality and could well be useful in the future, so even though it's not used at the moment, I'm leaving it in place.

# Split from harpstrata and harpguru-core

This package was created as a fragmentation of functionality from the harpstrata package and includes an unexposed `getCovarianceSeries` function which was packaged up as an unused export the harpguru-core package.
