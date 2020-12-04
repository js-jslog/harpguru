# harpguru

A monorepo containing the component packages to run and build the harpguru application

# Release steps

- Review all of the CHANGELOG.md files for changes since last tag
  - Create new entry drawing a line under the changes, being careful to update the label tag to the package version, but the link source to the anticipated harpguru tag number
  - Add a similar line to the bottom of the CHANGELOG.md file
- Increment the version number in the package.json and ensure it's the same as the one used in the CHANGELOG.md label tag
- Update `expo.version` in app.json of harpguru-expo-boilerplate package
- Tag harpguru and push
- Check that the links in the CHANGELOG.md files find the new tag destination
