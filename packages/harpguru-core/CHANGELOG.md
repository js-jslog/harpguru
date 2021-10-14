# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to ~~[Semantic Versioning](https://semver.org/spec/v2.0.0.html).~~
[Compatible Versioning](https://gitlab.com/staltz/comver).

### Format

- Added: for new features.
- Changed: for changes in existing functionality.
- Deprecated: for once-stable features removed in upcoming releases.
- Removed: for deprecated features removed in this release.
- Fixed: for any bug fixes.
- Security: to invite users to upgrade in case of vulnerabilities.

## [Unreleased](https://github.com/js-jslog/harpguru/compare/v10.0.0...HEAD) - yyyy-mm-dd

## [v8.1.0](https://github.com/js-jslog/harpguru/releases/tag/v10.0.0) - 2021-10-14

### Added

- MINOR: Pentaharp tuning added

### Changed

- MINOR: Make sizing adaptive to dimensions of harp being presented
- MINOR: Make layout adaptive to dimensions of harp being presented
- MINOR: Optimisation of rendering for improved UI speed

## [v8.0.0](https://github.com/js-jslog/harpguru/releases/tag/v9.0.0) - 2021-07-11

### Changed

- MINOR: Make sizing logic relative to size of harp being presented

### Added

- MINOR: Add valving menu alongside the tuning menu
- MINOR: Add tuning groups to tuning menu

### Changed

- MAJOR: Move quiz question setting to scales menu
- MAJOR: Collapse scales and chords menus together

### Removed

- MAJOR: Remove the halfvalved tuning options in favour of separate menu

## [v7.3.0](https://github.com/js-jslog/harpguru/releases/tag/v8.6.0) - 2021-03-25

### Fixed

- MINOR: Remove unnecessary OS font scaling on large menu text

## [v7.2.0](https://github.com/js-jslog/harpguru/releases/tag/v8.4.0) - 2021-02-19

### Added

- MINOR: Menu for limiting the range of quiz questions (effective for degrees only)

### Fixed

- MINOR: Add missing quiz questions
- MINOR: Fix positioning of option list on devices with notches
- MINOR: Prevent notification messages spilling over in to next page
- MINOR: Avoid overscaling quiz question text to preserve resolution

## [v7.1.0](https://github.com/js-jslog/harpguru/releases/tag/v8.3.0) - 2021-02-11

### Fixed

- MINOR: Ensure that menu's are swept aside so they don't invisibly block touches to the app below
- MINOR: Ensure that option list stacks are moved aside to prevent blocking touches to other lists in same stack
- MINOR: Improve menu close button container size to prevent blocking touches to other parts of the menus
- MINOR: Alter styling of hole number row to make visible in iOS

## [v7.0.0](https://github.com/js-jslog/harpguru/releases/tag/v8.0.0) - 2021-01-29

### Changed

- MAJOR: Upgrade react peer dependency requirement from 16.11 to 16.13
- MAJOR: Upgrade react-native peer dependency requirement from 0.62 to 0.63

## [v6.0.0](https://github.com/js-jslog/harpguru/releases/tag/v7.0.0) - 2021-01-28

### Added

- MINOR: A menu for scales and chords
- MINOR: Simplified dynamic sizing implemented

### Changed

- MAJOR: The covariant menu layout and workflow
- MINOR: The tuning menu layout
- MINOR: Scale notification flash no longer active when in the scales menu

### Removed

- MAJOR: Pan gesture handlers for opening and closing menus
- MAJOR: Long press handler to change root pitch location

## [v5.0.0](https://github.com/js-jslog/harpguru/releases/tag/v6.0.0) - 2021-01-10

### Added

- MAJOR: Quick access option buttons for display and experience mode
- MINOR: Ability choose whether the harpface is fragmented at the octaves or not

### Changed

- MINOR: Flush toggles differently in Quiz mode to Explore mode to improve experience
- MINOR: Only setup the first page with buffered toggles to flush on app initialisation

### Removed

- MAJOR: Display and experience mode options from the layout menu
- MAJOR: App reorientation to landscape during load (environment must now set it for HarpGuru)

## [v4.1.0](https://github.com/js-jslog/harpguru/releases/tag/v5.1.0) - 2020-12-04

### Changed

- MINOR: Differentiate next-page-button from other menu's by background colour

## [v4.0.0](https://github.com/js-jslog/harpguru/releases/tag/v5.0.0) - 2020-12-04

### Added

- MINOR: Include type definition exports so that consumers benefit from polyfills and reactn global state definition
- MAJOR: Add multiple screens of harp-guru
- MAJOR: Add active scale flash notification

### Changed

- MINOR: Improved presentatability of option enums
- MINOR: Ensure package dependencies are explicitly required
- MINOR: Remove unimported devDependencies (hoisted to workspace development context)
- MINOR: Move dev config to monorepo root and create lint-stage friendly run scripts
- MINOR: Determine cell activity from active ids list rather than remove activity matrix
- MINOR: Adapt to modifications in object returned from the harpstrata package
- MINOR: Import from new harpparts and harpcovariance packages where they have removed functionality from elsewhere
- MINOR: Implementation of matrix types using generic HarpFaceMatrix rather than dedicated types like DegreeMatrix

### Removed

- MINOR: Unused local covariance package (moved to harpcovariance; still unused, but more at home)
- MINOR: Some harpstrata related functionality which has been correctly moved to that package

### Fixed

- MINOR: Update quiz question every time Ask state is entered
- MINOR: Correct harpstrata dependency major version (far ahead of publishing - hence minor)
- MINOR: Add missing peer dependency, implicitly already included in workspace (far ahead of publishing - hence minor)

## [v3.0.0](https://github.com/js-jslog/harpguru/releases/tag/v4.0.0) - 2020-10-31

### Added

- MAJOR: Buffer for harp cell activity updates
- MINOR: Add animations to harp-cell toggleing
- MINOR: Add animations to menu interactions

### Changed

- MAJOR: Quiz mode modified to allow time to answer on all octaves
- MINOR: Some global state and reducers removed in favour of modularised logic
- MINOR: Memoisation added to HarpCell
- MINOR: Default harp setup to popular configuration (major pent in 2nd position)

### Removed

- MAJOR: Option swipe selection

## [v2.1.0](https://github.com/js-jslog/harpguru/releases/tag/v3.2.0) - 2020-10-19

### Changed

- MINOR: Menu swipe handler no longer blocks with expensive update on BEGIN state

## [v2.0.0](https://github.com/js-jslog/harpguru/releases/tag/v2.0.0) - 2020-10-10

### Added

- MINOR: Added multiple selectable options above and below selected one

### Changed

- MAJOR: Replaced the whole menu close tap, with a dedicated close button
- MAJOR: Long press root pitch change now considers which covariant is locked when setting next HarpStrata
- MINOR: Moved the covariant lock icons and improved their tap handler catchment area

### Fixed

- MINOR: Correct failing test from unchecked introduction of new apparatus

## [v1.0.0](https://github.com/js-jslog/harpguru/releases/tag/v1.0.0) - 2020-09-06

### Added

- INITIAL-DEVELOPMENT: Add covariant locking system to give user control of which covariants are varying together
- INITIAL-DEVELOPMENT: Add activity legend to help map degrees and pitches from a single view
- INITIAL-DEVELOPMENT: Add animation to options as they update

### Changed

- INITIAL-DEVELOPMENT: Move menus to both be on right hand side
- INITIAL-DEVELOPMENT: Improve 'inactive' colours for visual impact
- INITIAL-DEVELOPMENT: Improve naming used in menus
- INITIAL-DEVELOPMENT: Replace menu labels with icons
- INITIAL-DEVELOPMENT: Improve presentation of quiz question with superscript modifier

## [v0.1.0](https://github.com/js-jslog/harpguru/releases/tag/v0.1.0) - 2020-09-06

AT THIS POINT THE TAGS ARE NOW MADE IN THE `harpguru` PROJECT AND MAY NO LONGER MATCH THE VERSION OF THIS CONTRIBUTING PACKAGE

## [harpguru-core.v0.1.0](https://github.com/js-jslog/harpnative/releases/tag/harpguru-core.v0.1.0) - 2020-08-28

### Changed

- INITIAL-DEVELOPMENT: Remove HarpGuru app from expo boilerplate
- INITIAL-DEVELOPMENT: Modify dependencies and other project assumptions for use in a yarn workspaces context

## [v0.2.0](https://github.com/js-jslog/harpnative/releases/tag/v0.2.0) - 2020-08-21

### Added

- INITIAL-DEVELOPMENT: Introduce ReactN to enable the use of some global state
- INITIAL-DEVELOPMENT: Add a quiz mode
- INITIAL-DEVELOPMENT: Add context dependant sizing
- INITIAL-DEVELOPMENT: Add memoisation of HarpFace
- INITIAL-DEVELOPMENT: Add privacy policy and terms & conditions files

### Changed

- INITIAL-DEVELOPMENT: Enhance menu UX
- INITIAL-DEVELOPMENT: Present both sharp and flat version of Pitch
- INITIAL-DEVELOPMENT: Pivoted to an npm package

## [v0.1.0](https://github.com/js-jslog/harpnative/releases/tag/v0.1.0) - 2020-07-14

### Added

- INITIAL-DEVELOPMENT: Created minimum demonstratable product. Many v1.0.0 required features absent.

## Github release list

- [unreleased](https://github.com/js-jslog/harpguru/compare/v10.0.0...HEAD)
- [v8.1.0](https://github.com/js-jslog/harpguru/releases/tag/v10.0.0)
- [v8.0.0](https://github.com/js-jslog/harpguru/releases/tag/v9.0.0)
- [v7.3.0](https://github.com/js-jslog/harpguru/releases/tag/v8.6.0)
- [v7.2.0](https://github.com/js-jslog/harpguru/releases/tag/v8.4.0)
- [v7.1.0](https://github.com/js-jslog/harpguru/releases/tag/v8.3.0)
- [v7.0.0](https://github.com/js-jslog/harpguru/releases/tag/v8.0.0)
- [v6.0.0](https://github.com/js-jslog/harpguru/releases/tag/v7.0.0)
- [v5.0.0](https://github.com/js-jslog/harpguru/releases/tag/v6.0.0)
- [v4.1.0](https://github.com/js-jslog/harpguru/releases/tag/v5.1.0)
- [v4.0.0](https://github.com/js-jslog/harpguru/releases/tag/v5.0.0)
- [v3.0.0](https://github.com/js-jslog/harpguru/releases/tag/v4.0.0)
- [v2.1.0](https://github.com/js-jslog/harpguru/releases/tag/v3.2.0)
- [v2.0.0](https://github.com/js-jslog/harpguru/releases/tag/v2.0.0)
- [v1.0.0](https://github.com/js-jslog/harpguru/releases/tag/v1.0.0)
- [v0.1.0](https://github.com/js-jslog/harpguru/releases/tag/v0.1.0)
- [harpguru-core.v0.1.0](https://github.com/js-jslog/harpnative/releases/tag/harpguru-core.v0.1.0)
- [v0.2.0](https://github.com/js-jslog/harpnative/releases/tag/v0.2.0)
- [v0.1.0](https://github.com/js-jslog/harpnative/releases/tag/v0.1.0)
