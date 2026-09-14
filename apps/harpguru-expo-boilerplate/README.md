# HarpGuruExpoBoilerplate

This project is simply some expo boilerplate to run the HarpGuru application in expo go and build binaries for testing and release.

## Build process

Builds run in CI, and the full picture — test builds, releases, tagging and the
one-off credential setup — is in
[ the release pipeline ](../../docs/release-pipeline.md). What follows is only
what is run from this package.

### Local fallbacks

For when CI is in the way:

```
yarn build-android
yarn build-ios
```

or from the monorepo root, where a script name has to say which workspace it
delegates to, so these carry the `expo-` prefix (as `expo-tunnel` does for this
package's `tunnel`):

```
yarn expo-build-android
yarn expo-build-ios
```

Each pair is the same command — the root script does nothing but
`yarn workspace harpguru-expo-boilerplate run …`.

They build with the `production` profile and submit to the same closed testing
tracks as a CI test build. The caveat is that they build the **working tree**,
so the artifact in front of testers may correspond to no commit that exists
anywhere. Prefer the workflow.

### A side-loadable binary

To create a preview .apk which can be downloaded from the resulting link and
side-loaded onto a device or emulator — note that Play will not accept an apk,
so this one is for direct installation only:

```
npx eas-cli build -p android --profile preview
```

# Split from HarpNative

This project was imported in to this monorepo from a previous isolated project called HarpNative. This project was a combination of both the react native application code and the expo boilerplate. At the time of the split, the version was returned to 0.1.0. As you'll be able to tell from the other packages split apart in thie monorepo since then, I now think that this is a mistake; but you live and learn.

[This is the pull request with all of the commits relating to _this package's_ split from HarpNative and in to a monorepo](https://github.com/js-jslog/harpnative/pull/73)
