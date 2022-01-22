![Logo](logo.png)

# Fatina

Small & Light tweening library for **Games** / **Web**

- **Website**: [Here](https://kefniark.github.io/Fatina/)
- **API**: [Here](https://kefniark.github.io/Fatina/api/basic/)
- **Samples**: [Here](https://kefniark.github.io/Fatina/samples/generic/)
- **Online Demo**: [Here](https://runkit.com/kefniark/sample-fatina)

[![NPM Version](https://img.shields.io/npm/v/fatina.svg)](https://npmjs.org/package/fatina)
[![NPM Download](https://img.shields.io/npm/dm/fatina.svg)](https://npmjs.org/package/fatina)
[![CDN Download](https://data.jsdelivr.com/v1/package/npm/fatina/badge)](https://www.jsdelivr.com/package/npm/fatina)
[![Build Status](https://img.shields.io/travis/kefniark/Fatina/master.svg)](https://travis-ci.org/kefniark/Fatina)
[![Coverage Status](https://coveralls.io/repos/github/kefniark/Fatina/badge.svg?branch=master)](https://coveralls.io/github/kefniark/Fatina?branch=develop)
[![License](https://img.shields.io/npm/l/fatina.svg)](https://npmjs.org/package/fatina)

## Description

A comprehensive and easy to use animation library for **Typescript** / **Javascript**

- Easy to use, API strongly inspired by [Dotween (C# tweening library)](http://dotween.demigiant.com/documentation.php)
- Lightweight with no dependencies ( < 20KB )
- Unit tested + code coverage
- Compatible with both NodeJS (CommonJS) & Browser (ESM)
- Open source and MIT License

## Getting Started

### Install

If you use NPM

```ts
> npm install fatina
```

And load it with

```ts
// standard import with esm module or typescript
import Fatina from 'fatina'
// OR
// standard node.js require
var fatina = require('fatina').default
// OR Deno
import Fatina from 'https://cdn.jsdelivr.net/npm/fatina'
```

And if you want to use the CDN version:

```ts
<script src="https://cdn.jsdelivr.net/npm/fatina"></script>
```

- [More Information](https://kefniark.github.io/Fatina/basics/download/)

### Usage

```ts
Fatina.tween(obj).to(destination, duration).start()

// example
Fatina.tween(sprite).to({ x: 12, y: 25 }, 0.5).start()
```

- [Documentation](https://kefniark.github.io/Fatina/api/basic/)
- [Samples](https://kefniark.github.io/Fatina/samples/generic/)

---

## Development

### Getting Started

If you want to take a look at the code or help, it's quite easy to get started

```sh
npm install
npm run dev
```

This will start a server on http://localhost:8080/ where you can test few samples with the current version

### Tests

When you are done with your change, just make sure to run tests `npm run test`

### Other

To make a build (generated in `build/`)

```sh
npm run build
```

To generate the **API docs** (generated in `build/docs/`)

```sh
npm run docs
```
