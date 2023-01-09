# HarpGuruExpoBoilerplate

This project is simply some expo boilerplate to run the HarpGuru application in expo go and build binaries for testing and release.

## Build process

### Testing

#### Android

To create a preview binary .apk file which can be downloaded from a resulting link and installed on a device or in an emulator.

```
npx eas-cli build -p android --profile preview
```

#### iOS

YET TO BE COMPLETED

### Release

#### Android

To create a production .aab

```
npx eas-cli build -p android --profile production
```

# Split from HarpNative

This project was imported in to this monorepo from a previous isolated project called HarpNative. This project was a combination of both the react native application code and the expo boilerplate. At the time of the split, the version was returned to 0.1.0. As you'll be able to tell from the other packages split apart in thie monorepo since then, I now think that this is a mistake; but you live and learn.

[This is the pull request with all of the commits relating to _this package's_ split from HarpNative and in to a monorepo](https://github.com/js-jslog/harpnative/pull/73)
