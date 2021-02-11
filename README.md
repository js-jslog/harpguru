# harpguru

A monorepo containing the component packages to run and build the harpguru application

# Release steps

- Review all of the CHANGELOG.md files for changes since last tag
  - Create new entry drawing a line under the changes, being careful to update the label tag to the package version, but the link source to the anticipated harpguru tag number
  - Update the `unreleased` line's tag reference
  - Add a similar line to the bottom of the CHANGELOG.md file and similarly update the `Unreleased` tag reference
- Increment the version number in the package.json and ensure it's the same as the one used in the CHANGELOG.md label tag
- Update the dependencies on other harpguru packages if they exist
  - You can test this by running a `yarn install` at the end. If you have the wrong dependencies then they will be installed in local `node_modules` folders.
- Update app.json in harpguru-expo-boilerplate package
  - Set `expo.version` to the version number the project is about to be tagged with (minus the leading 'v')
  - Set `expo.ios.buildNumber` to the same version number as `expo.version`
  - Increment `expo.android.versionCode`
- Tag harpguru and push
- Check that the links in the CHANGELOG.md files find the new tag destination
