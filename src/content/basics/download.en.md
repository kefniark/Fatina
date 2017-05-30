+++
date = "2017-05-21T13:06:37+09:00"
title = "Getting Started"
toc = true
weight = 7

+++

## Installation

Download the [library](https://github.com/kefniark/Fatina/releases) and include it in your code:

```html
<script src="fatina.min.js"></script>
```
<!--
You can also reference a CDN-hosted version in your code, thanks to cdnjs. For example:

```html
<script src="..."></script>
```
-->

### More advanced users might want to use `npm`

```bash
npm install fatina
```

Then include the Fatina module with the standard node.js `require`:

```javascript
var Fatina = require('fatina');
```

And you can use Fatina as in all other samples :
```javascript
var t = new Fatina.Tween( /* etc */ );
t.start();
```