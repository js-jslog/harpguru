# Unnecessary reanimated and gesture handler packages

You will find that the `react-native-reanimated` and `react-native-gesture-handler` packages are included in the dependencies for this project, even though the only place they are actually used is in the `harpguru-core` package.

I believe that means that it is not actually required here, and indeed while using `expo-go` it is not required. However when doing an EAS build the resulting binary crashes whilst being opened.

Consequently they are in this boilerplate project and I may or may not have time to raise this as a concern to the community.
