# monorepo-styleguide
A monorepo styleguide using lerna, storybook and etc..

## Up & Running

To initialize lerna to manage your mono repo

```sh
> mkdir <monorepo_name> && cd $_
> npx lerna init
```

## Creating Packages

```sh
lerna create <component_name>
```

We will be using the micro bundler for code compilation than traditional webpack

```sh
> cd packages/<component_name> && yarn add microbundle -D
```

Let’s add one script inside our components package’s package.json file:

```sh
// packages/<component_name>/package.json

"scripts": {
   ..
   "dev": "microbundle watch --jsx React.createElement"
 }
```

Also, we need to add a source to the package.json file:

```sh
// packages/components/package.json

"source": "lib/index.js",
```

Let’s create one file called index.js inside our packages/components/lib directory.

## Independent vs. Managed

> We can use the [atlassian/lerna-semantic-release](https://github.com/atlassian/lerna-semantic-release) to manage the version.

Independent packages can be increment the version numbers individually while managed versions need to incremented manually.

## Storybook Setup

We’ll now install Storybook and build our React components with it.

```sh
> npx -p @storybook/cli sb init --type react
```

Adds two storybook scripts

```js
"scripts": {
   ..
   "storybook": "start-storybook -p 6006",
   "build-storybook": "build-storybook"
 },
```
