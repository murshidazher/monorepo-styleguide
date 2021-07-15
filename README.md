# monorepo-styleguide

A monorepo styleguide using lerna, storybook and etc..

## Setting Up from Scratch

To initialize lerna to manage your mono repo

```sh
> mkdir <monorepo_name> && cd $_
> npx lerna init
```

```sh
> yarn add -D @babel/cli @babel/core @babel/plugin-proposal-object-rest-spread @babel/plugin-syntax-object-rest-spread @babel/plugin-transform-destructuring @babel/preset-env @babel/preset-react babel-jest babel-runtime eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react husky jest jest-styled-components lint-staged react react-dom react-test-renderer regenerator-runtime
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

## To add a new package

```sh
> lerna create monorepo-config
```

```sh
> yarn add -D @babel/core babel-loader microbundle jest @babel/core @babel/plugin-proposal-object-rest-spread @babel/preset-env @babel/preset-react babel-core babel-jest
```

Add the scripts

```json
// package.json
...
"dev": "microbundle watch --jsx React.createElement lib/*.js",
"prepublish": "babel --root-mode upward src --out-dir lib",
"test": "jest --coverage",
```

Let’s now connect our packages. To do that, we can simply add the package you need to make as dependency in the other package’s package.json file:

```
// packages/<component_to_add>/package.json

"dependencies": {
   ..
   "components": "0.0.0"
 }
```

## Independent vs. Managed

> We can use the [atlassian/lerna-semantic-release](https://github.com/atlassian/lerna-semantic-release) to manage the version.

Independent packages can be increment the version numbers individually while managed versions need to incremented manually.

## Storybook Setup

We’ll now install Storybook and build our React components with it.

```sh
> mkdir temp_storybook
> cd temp_storybook && npx -p @storybook/cli sb init --type react
# move the all the content and package.json inside the `.storybook` directory and move the `.storybook` to root directory. Then remove the `temp_storybook` directory.
```

You should now be able to run Storybook locally by running npm run storybook or if you prefer yarn storybook.

Adds two storybook scripts

```js
"scripts": {
   ..
   "storybook": "start-storybook -p 6006",
   "build-storybook": "build-storybook"
 },
```

Install storybook dependencies,

```sh
yarn add -D @babel/core @storybook/addon-actions @storybook/addon-links @storybook/addon-storysource @storybook/addons @storybook/react babel-loader storybook-readme styled-components @storybook/source-loader
```

Add `webpack.config.js`,

```js
const path = require('path');

module.exports = function ({ config }) {
  config.module.rules.push({
    // test: /\.stories\.jsx?$/,
    test: /\.jsx?$/,
    include: path.resolve('./stories'),
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });

  return config;
};
```

## Up & Running

```sh
> yarn i
> lerna bootstrap
> cd .storybook && yarn i
> yarn start
```
