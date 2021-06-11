# Convert reed array to hole array

1. Start with a reed array
2. pivotReedArray to get reed pair array
3. reedPairToHole map reed pair array to hole array
4. insertHoleBends map holes to more detailed holes
5. insertHoleOverbends map holes to more detailed holes
6. filterOverbendsMapCallback map holes out of redundant overblows
7. \*(Validate the hole array - not constructed yet)
8. Finish with hole array

# Prepare go build matrices

1. deriveMatrixSpecs
2. produce an empty array of the required height

# Build the halfstepindex matrix

1. halfstepindexRowMapCallback to produce the halfstepindex matrix from the empty array

# Build the interactionid matrix

1. interactionidRowMapCallback to produce the interactionid matrix from the empty array

Laying the plan out like this I can see that some of the functions could do with renaming for consistency:

- reedPairToHole -> mapReedPairToHole
- insertHoleBends -> mapHoleToIncludeBends
- insertHoleOverbends -> mapHoleToIncludeOverbends
- filterOverbendsMapCallback -> mapHoleToFilterOverbends

And the intended name of this function itself should change since it's now going to be starting with a reed array rather than a hole array
