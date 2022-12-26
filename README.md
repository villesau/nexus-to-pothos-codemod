# Nexus to Pothos codemod

[![npm version](https://badge.fury.io/js/nexus-to-pothos-codemod.svg)](https://www.npmjs.com/package/nexus-to-pothos-codemod)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/villesau/nexus-to-pothos-codemod/blob/master/README.md#Contributing)

This is a codemod to migrate from [Nexus](https://nexusjs.org/) to [Pothos](https://pothos-graphql.dev/)

This aims to transform all the nexus types, queries and mutations to Pothos equivalents. Please note that
the codemod is by no means complete. You still need some manual adjustments. Below is a list of known missing features.

You can check out the [`__textfixtures__`](https://github.com/villesau/nexus-to-pothos-codemod/tree/master/__testfixtures__) folder to see full list of supported transformations.

## Why should I migrate to use Pothos?

- Pothos has superior type safety
- Pothos does not require you to generate types which makes type feedback much much faster
- Pothos is actively maintained

## Install

```bash
$ yarn global add nexus-to-pothos-codemod
```

or

```bash
$ npm install -g nexus-to-pothos-codemod
```

## Usage

```bash
$ nexus-to-pothos-codemod ./**/*.ts --ignore-pattern="**/node_modules/**" --parser=ts
```

The CLI is the same as in [jscodeshift](https://github.com/facebook/jscodeshift)
except you can omit the transform file.

Alternatively, you can run the codemod using jscodeshift as follows:

```bash
$ yarn global add jscodeshift
$ yarn add nexus-to-pothos-codemod
$ jscodeshift -t node_modules/nexus-to-pothos-codemod/transform.ts --ignore-pattern="**/node_modules/**" ./**/*.js  --parser=ts
```

## What is missing?

- automatic import updates

## Contributing

Contributions are more than welcome!
