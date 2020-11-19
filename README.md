# harpguru

A monorepo containing the component packages to run and build the harpguru application

## Lerna & Yarn workspaces

The project uses Yarn workspaces, setup using Lerna in order to make the development version of each project available to the other projects. This means that features which require changes in multiple projects can be rapidly developed.

It is my ambition to leave the opportunity to publish each package independently open which is why I have set the Lerna versioning accordingly.

It is also my ambition to make the development aspects of the projects as unified as possible to make development as rapid and reliable. Consequently I have taken advantage of hoisting for the devDependencies.

This leads to a conflict of interest in the setup. We want to ensure that all the production imports are attributable to packages which that package explicitly requires, whilst leaving the devDependencies only implicitly satisfied by the fact that the package is inside a Yarn workspace with all the devDependencies installed at the root level.

### Redundant devDependencies

This is somewhat achievable using the `import/no-extraneous-dependencies` eslint rule. However I have not found a way to ignore this rule in the test files, so anything which is imported there which a devDependencies will also need to appear in the packages package.json installs somewhere. This is a shame but at the moment it only affects one package:

```
// harpguru-core package.json
...
"devDependencies": {
  "@testing-library/react-native": "^5.0.3"
},
...
```

### Impotent version number

A related, and from what I can tell _general_, problem with Lerna, is that the symlinked local dependencies are included in their latest form, regarless of the version number included in their dependant's package.json.

The problem here is that if the dependant were to be published for use outside the workspace context, it is possible that a very different version of the dependency than the one active in the workspace context would be installed.

The only way to avoid this, as far as I can tell at the moment, is to make sure that the dependant package.json is reliably updated whenever the dependancy version is incremented.

### Peer dependencies

It's essential that react and react native are installed at the same version in both the core react app as well as the boilerplate app. The core app is run by the boilerplate app so I have represented this dependency as a peer dependency.

Inside the workspace context we are told during installation that the peer dependencies are not met. I suspect that outside of that context the peer dependencies would be acknowledged as satisfied, but I don't have any evidence for that at this point. At any rate, the apps run.

Similarly, I have added the expo icons package as a peer dependency for the same reason.

It will be important to make sure that these peer dependencies are updated as their counterparts in the boilerplate are updated so that the expected version will match the installed version if the non-workspace context install works as I am expecting.
