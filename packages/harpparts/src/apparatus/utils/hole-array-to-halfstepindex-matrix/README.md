Convert a hole array to halfstepindex matrix

I'd like to use a series of maps or a reduce or something.

We're going to have to know how many times through the hole array we'll need to pass. Once for each interaction type which will exist.

So we can produce a y-axis array derived from the longest bend / overdraw + longest blowbend / overblow.

Then for each y-axis we map the hole-array specifying which index of the bend / overdraw and blowbend / overblow. We will have had to have a validation step beforehand to make sure that there are no bends and overdraws on the same hole for example.
