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

## [Unreleased](https://github.com/js-jslog/harpguru/compare/v9.0.0...HEAD) - yyyy-mm-dd

### Added

- MINOR: Wilde Minor & Easy Diatonic tunings

## [v9.0.0](https://github.com/js-jslog/harpguru/releases/tag/v9.0.0) - 2021-07-11

### Added

- MAJOR: Add tuning category and short name property to Tuning type for presentational purposes
- MINOR: Add tuning / valving objects / ids for use in apparatus builder function
- MINOR: Add many more tunings to the list of availables
- MINOR: Tuning getter function for presentational interrogation beyond just it's id

### Changed

- MAJOR: Replace apparatus getter with apparatus builder function
- MAJOR: Renamed several existing tunings by id

## [v8.2.0](https://github.com/js-jslog/harpguru/releases/tag/v8.5.0) - 2021-03-14

### Added

- MINOR: Add Power draw and Woozle minor with their half valved versions

## [v8.1.0](https://github.com/js-jslog/harpguru/releases/tag/v7.0.0) - 2021-01-28

### Added

- MINOR: Property to scale objects to identify category (scale or chord)
- MINOR: More scales and chords
- MINOR: Function to recover Scale constant from it's scale degrees
- MINOR: Properties to identify Pozition and Pitch objects
- MINOR: Typeguards to identify Pozition and Pitch objects

## [v8.0.0](https://github.com/js-jslog/harpguru/releases/tag/v5.0.0) - 2020-12-04

### Added

- MAJOR: Split this package out from harpstrata to make dedicated package for harp parts concepts
- MINOR: Add scales objects to API

## [v7.3.0](https://github.com/js-jslog/harpguru/releases/tag/v1.3.0) - 2020-09-13

### Added

- MINOR: Add Power Bender tuned apparatus
- MINOR: Missing overblows and overdraws in natural minor
- MINOR: Missing overblow in Wilde tuning

### Removed

- MINOR: Unnecessary overblow in Wilde tuning

### Fixed

- MINOR: Incorrect overblow in Wilde tuning

## [v7.2.0](https://github.com/js-jslog/harpguru/releases/tag/v1.2.0) - 2020-09-10

### Added

- MINOR: Add Wilde tuned apparatus

## [v7.1.0](https://github.com/js-jslog/harpguru/releases/tag/v0.1.0) - 2020-09-06

AT THIS POINT THE TAGS ARE NOW MADE IN THE `harpguru` PROJECT AND MAY NO LONGER MATCH THE VERSION OF THIS CONTRIBUTING PACKAGE

## [v7.1.0](https://github.com/js-jslog/harpstrata/releases/tag/v7.1.0) - 2020-08-28

### Changed

- MINOR: Added comment to README.md explaining that the v7.x.x tags have not been made on the master branch

## [v7.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v7.0.0) - 2020-08-28

### Changed

- MAJOR: Overhauled assumptions about project to run as a workspaces in a yarn workspaces context

### REMOVED

- MAJOR: Configuration to publish as npm package

## [v6.3.0](https://github.com/js-jslog/harpstrata/releases/tag/v6.3.0) - 2020-08-20

### Added

- MINOR: Add `getPitch` to the public API

## [v6.2.0](https://github.com/js-jslog/harpstrata/releases/tag/v6.2.0) - 2020-08-20

### Added

- MINOR: Add properties to Pitches to inform contextual rendering

## [v6.1.0](https://github.com/js-jslog/harpstrata/releases/tag/v6.1.0) - 2020-07-20

### Added

- MINOR: Add getDegreeIds to public api

## [v6.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v6.0.0) - 2020-06-04

### Changed

- MAJOR: Reorder the PozitionIds by name rather than rootOffset
- MINOR: Recover root offset values from Pozition instances rather than from enum order
- MAJOR: The names of many of the types and functions within the Covariant module
- MINOR: Update README.md with name changes in Covariants module

### Fixed

- MINOR: Fix Covariant module typeguard exports to be functions rather than types
- MINOR: Changed from Semantic Versioning to Compatible Versioning

### Fixed

- MAJOR: Superfluous `undefined` type union removed from HarpStrata type on public API

## [v5.2.0](https://github.com/js-jslog/harpstrata/releases/tag/v5.2.0) - 2020-06-01

### Added

- MINOR: Add CovariantControlVars subtype typeguards to public api
- MINOR: Typeguards created for PitchIds and PozitionIds

### Changed

- PATCH: Have the enumerators be their own source of truth with respect to order

## [v5.1.1](https://github.com/js-jslog/harpstrata/releases/tag/v5.1.1) - 2020-05-26

### Added

- PATCH: CovariantsGroup type exported from public api

## [v5.1.0](https://github.com/js-jslog/harpstrata/releases/tag/v5.1.0) - 2020-05-25

### Added

- MINOR: Add covariant deduction functions
- MINOR: Add ability to specify origin value on pitch & pozition id list getters
- PATCH: Pitch, Pozition and Degree id ordered list generation (for internal use)

### Removed

- PATCH: ORDERED_XXX constants. Replaced by the ordered list generation described above (internal use only)

## [v5.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v5.0.0) - 2020-05-17

### Added

- MAJOR: Add all the properties which the calling app would need to know how the harpstrata was generated
- MAJOR: Improve the name of one of the HarpStrataProps properties

## [v4.0.1](https://github.com/js-jslog/harpstrata/releases/tag/v4.0.1) - 2020-05-13

### Fixed

- PATCH: Fix enum list lookup, fixes bug demonstrated by new test case

## [v4.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v4.0.0) - 2020-05-09

### Added

- MAJOR: Add IsActiveComplex to the HarpStrata type
- MINOR: Add remaining Pozitions to make all 12
- MINOR: Add remaining Pitches to public API function make all 12

### Changed

- MAJOR: Change getHarpStrata function signature to typed object
- PATCH: Restructured internal architecture
- PATCH: Change the value part of some of the DegreeIds enum

## [v3.0.2](https://github.com/js-jslog/harpstrata/releases/tag/v3.0.2) - 2020-05-03

- PATCH: Include Pitch and PitchIds types in the entrypoint file
- PATCH: Fix version links in CHANGELOG for `v3.0.1` & `v3.0.0`

## [v3.0.1](https://github.com/js-jslog/harpstrata/releases/tag/v3.0.1) - 2020-05-03

### Fixed

- PATCH: Change `Unreleased` CHANGELOG entry to `v3.0.0`

## [v3.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v3.0.0) - 2020-05-03

### Added

- MAJOR: Add Pitch information to public API, changing related types
- MAJOR: Pitch related parameters added to public API, changing function signatures

### Fixed

- PATCH: Correct v2.0.0 tag name in CHANGELOG

## [v2.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v2.0.0) - 2020-04-22

### Added

- MINOR: More Interaction types added
- MINOR: Natural minor apparatus added

### Changed

- MAJOR: 1d InteractionMask changed to 2d InteractionMatrix

## [1.0.0](https://github.com/js-jslog/harpstrata/releases/tag/1.0.0) - 2020-04-21

### Added

- Library created

## Github release list

- [unreleased](https://github.com/js-jslog/harpguru/compare/v9.0.0...HEAD)
- [v9.0.0](https://github.com/js-jslog/harpguru/releases/tag/v9.0.0)
- [v8.2.0](https://github.com/js-jslog/harpguru/releases/tag/v8.5.0)
- [v8.1.0](https://github.com/js-jslog/harpguru/releases/tag/v7.0.0)
- [v8.0.0](https://github.com/js-jslog/harpguru/releases/tag/v5.0.0)
- [v7.3.0](https://github.com/js-jslog/harpguru/releases/tag/v1.3.0)
- [v7.2.0](https://github.com/js-jslog/harpguru/releases/tag/v1.2.0)
- [v7.1.0](https://github.com/js-jslog/harpguru/releases/tag/v0.1.0)
- [v7.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v7.0.0)
- [v6.3.0](https://github.com/js-jslog/harpstrata/releases/tag/v6.3.0)
- [v6.2.0](https://github.com/js-jslog/harpstrata/releases/tag/v6.2.0)
- [v6.1.0](https://github.com/js-jslog/harpstrata/releases/tag/v6.1.0)
- [v6.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v6.0.0)
- [v5.2.0](https://github.com/js-jslog/harpstrata/releases/tag/v5.2.0)
- [v5.1.1](https://github.com/js-jslog/harpstrata/releases/tag/v5.1.1)
- [v5.1.0](https://github.com/js-jslog/harpstrata/releases/tag/v5.1.0)
- [v5.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v5.0.0)
- [v4.0.1](https://github.com/js-jslog/harpstrata/releases/tag/v4.0.1)
- [v4.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v4.0.0)
- [v3.0.2](https://github.com/js-jslog/harpstrata/releases/tag/v3.0.2)
- [v3.0.1](https://github.com/js-jslog/harpstrata/releases/tag/v3.0.1)
- [v3.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v3.0.0)
- [v2.0.0](https://github.com/js-jslog/harpstrata/releases/tag/v2.0.0)
- [1.0.0](https://github.com/js-jslog/harpstrata/releases/tag/1.0.0)
