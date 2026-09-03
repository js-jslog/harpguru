# HarpGuruExpoBoilerplate

This project is simply some expo boilerplate to run the HarpGuru application in expo go and build binaries for testing and release.

## Build process

Builds normally run in CI. See [ the release pipeline ](../../docs/release-pipeline.md)
for the full picture; what follows is the summary and the local fallbacks.

### Testing

Actions -> **Test build** -> *Run workflow*, choosing the branch and the
platform. Both platforms build with the `production` profile and are submitted
to the closed testing tracks — Play `internal`, and internal TestFlight, which
needs no Beta App Review and so reaches testers straight away.

No tag is created and no version number is consumed. EAS increments the build
counters, so a branch can produce as many test builds as it needs at the same
`expo.version`.

### Release

Merging to `master` with a new `expo.version` tags the merge commit, builds it
and submits to open testing on both stores. There is nothing to run by hand.

### Local fallbacks

For when CI is in the way. These submit to the same closed tracks as a CI test
build. From this package:

```
yarn build-android
yarn build-ios
```

or from the monorepo root:

```
yarn expo-build-android
yarn expo-build-ios
```

The caveat is that they build the **working tree**, so the artifact in front of
testers may correspond to no commit that exists anywhere. Prefer the workflow.

To create a preview binary .apk which can be downloaded from a resulting link
and side-loaded onto a device or emulator — note that Play will not accept an
apk, so this one is for direct installation only:

```
npx eas-cli build -p android --profile preview
```

# Split from HarpNative

This project was imported in to this monorepo from a previous isolated project called HarpNative. This project was a combination of both the react native application code and the expo boilerplate. At the time of the split, the version was returned to 0.1.0. As you'll be able to tell from the other packages split apart in thie monorepo since then, I now think that this is a mistake; but you live and learn.

[This is the pull request with all of the commits relating to _this package's_ split from HarpNative and in to a monorepo](https://github.com/js-jslog/harpnative/pull/73)
