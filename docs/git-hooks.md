# Git hooks

Two git hooks have been implemented with similar but slightly different goals in mind.

## Precommit

During precommit, it is desirable to fix all of the formatting and linting issues, and check the _relevant_ tests and typescript compilations.

Speed is important at this stage since keeping commits small and frequent is a priority for me.

The tools seem to be available to achieve this for the formatting and linting, they are mostly there for the testing, but the typescript analysis is still quite a bit slower than I would like.

Still all of these tasks are being completed during precommit and I have not stopped using it yet.

To a large degree the ability to complete the associated scripts here is thanks to the [lint-staged](https://preview.npmjs.com/package/lint-staged) package. It doesn't seem possible to integrate the tsc analysis in to lint-staged which is part of the reason that it is the weak link in this chain. I have given a detailed description of how lint-staged has been used to achieve my precommit requirements below, since it's implementations with each dependency is not consistent and their justifications deserve recording for when decisions need to be made at a later date.

## Prepush

During prepush we want the same analysis to take place, but we want it to be project wide incase anything slipped through the lint-staged refined version. We also don't want _any_ files to be rewritten automatically. If a failure has occurred then I want to know it. That's useful information for improving the precommit actions in the future.

## Use of lint-staged & lerna run

With prettier, we are fortunate that a packages local prettier config is considered for all the prettification which happens in that package, even if prettier is being run from the monorepo root. This means that we don't need to use lerna run to get package scope on the yarn run script. We can simply tell lint-staged to run `prettier --write` and pass the staged file names to it. One single rapid run is completed for each file and we're done with prettier.

For eslint and jest we are not so fortunate. For both of these packages, it is important to be running the `eslint` or the `jest` command from within the package that contains the files to be linted or tested. This is because the configuration for eslint and jest is more complex than for prettier and may refer to dependencies which might not be found by upward traversal for node_modules folders from the monorepo root. In this particular project that is true because the react & react-native dependencies have things that jest and eslint need access to for the packages local configuration, but which have been configured to not be hoisted during install for reasons which I think are [ described here ](https://engineering.brigad.co/react-native-monorepos-code-sharing-f6c08172b417).
