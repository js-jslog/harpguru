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

# Build guide

New build guide under development [ here ](./apps/harpguru-expo-boilerplate/README.md)

## iOS build

Expected questions and answers:

```
? You are removing certificate used by @jslog/harp-guru. Do you want to continue? Yes
Removing Distribution Certificate...

Removing Provisioning Profile for @jslog/harp-guru (com.jslog.harpguru)
Removing Provisioning Profile...

? Do you also want to revoke it on Apple Developer Portal? No
? Removing this key/cert will disable notifications in @jslog/harp-guru. Do you want to continue? No
Aborting
? Do you have access to the Apple account that will be used for submitting this app to the App Store? Yes
Please enter your Apple Developer Program account credentials. These credentials are needed to manage certificates, keys and
provisioning profiles in your Apple Developer account.
The password is only used to authenticate with Apple and never stored
Learn more here
? Apple ID:
```

# Testing guide

## iOS simulator

A simulator build can be created from the harpguru-expo-boilerplate package (see package.json).

Double click the tar file produced to extract a `harpguru.app` file.

To load this app in to a simulated device, first you need to acquire the device id and the command xcode to install the app to it.

eg:

```
xcrun simctl list # to recover the device id
xcrun simctl install <device id> <path to app file>
# eg
xcrun simctl install 74F3E445-D2CF-4CC3-916D-70A7D5C432F3 ~/Desktop/harp-guru.app
# Requires that a device has been booted
xcrun simctl boot <device id>
```

# Manual render speed testing

See [ this code review discussion ](https://github.com/js-jslog/harpguru/pull/133#discussion_r761787427) for some version specific results at v10.0.0.
