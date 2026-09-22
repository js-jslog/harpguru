# Unnecessary reanimated and gesture handler packages

You will find that the `react-native-reanimated` and `react-native-gesture-handler` packages are included in the dependencies for this project, even though the only place they are actually used is in the `harpguru-core` package.

I believe that means that it is not actually required here, and indeed while using `expo-go` it is not required. However when doing an EAS build the resulting binary crashes whilst being opened.

Consequently they are in this boilerplate project and I may or may not have time to raise this as a concern to the community.

## react-native-worklets

Since the Expo SDK 54 upgrade, `react-native-worklets` sits in the same position: declared here and in `harpguru-core`, but only used by the latter.

It carries an extra constraint of its own. Expo Go ships one specific native worklets build, and the JS dependency has to match it exactly, so the version is pinned exactly — no `~`, no `^` — in both `package.json` files. A mismatch between the two copies resolves to something Expo Go rejects at startup. `react-native-reanimated` is pinned exactly for the same reason. The versions Expo Go expects are the ones listed in `expo`'s own `bundledNativeModules.json`.
