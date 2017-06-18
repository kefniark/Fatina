![Logo](logo.png)

# Fatina
Small & Light tweening library for **Games** / **Web**

* **Website**: [Here](https://kefniark.github.io/Fatina/)
* **API**: [Here](https://kefniark.github.io/Fatina/api/basic/)
* **Samples**: [Here](https://kefniark.github.io/Fatina/samples/generic/)

[![NPM Version](https://img.shields.io/npm/v/fatina.svg)](https://npmjs.org/package/fatina)
[![NPM Downloads](https://img.shields.io/npm/dm/fatina.svg)](https://npmjs.org/package/fatina)
[![Build Status](https://img.shields.io/travis/kefniark/Fatina.svg)](https://travis-ci.org/kefniark/Fatina)

## Description
A comprehensive and easy to use animation library for **Typescript** / **Javascript**

* Easy to use (API strongly inspired by Dotween)
* Lightweight with no dependencies ( < 25KB )
* Unit tested + code coverage
* Open source and MIT License (use it as you please)

## Getting Started

### Install
If you use directly the minified version
```ts
<script src="fatina.min.js"></script>
```
Or if you use NPM
```ts
> npm install fatina
```
And load it with
```ts
// standard node.js require
var Fatina = require('fatina');
// OR
// standard import with typescript (typed version)
import * as Fatina from 'fatina';
```
* [More Information](https://kefniark.github.io/Fatina/basics/download/)

### Usage
```ts
Fatina.Tween(obj, properties).To(destination, duration).Start();
```
* [Documentation](https://kefniark.github.io/Fatina/api/basic/)
* [Samples](https://kefniark.github.io/Fatina/samples/generic/)
