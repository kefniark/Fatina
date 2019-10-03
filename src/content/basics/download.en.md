+++
date = "2019-10-01T13:06:37+09:00"
title = "Getting Started"
toc = true
weight = 7

+++

### 1. Manual Installation

Download the [library](https://github.com/kefniark/Fatina/releases) and include it in your code:

```html
<script src="fatina.min.js"></script>
```

<br>

### 1 bis. NPM Installation

More advanced users might want to use `npm`
```bash
npm install fatina
```

Then include the Fatina module :

```javascript
// standard node.js require
var Fatina = require('fatina');

// OR

// standard import with typescript (typed version)
import Fatina from 'fatina';
```

### 2. Done !
Now you can use **Fatina** properly :
```javascript
Fatina.tween( /* etc */ ).start();
```
<br>
<div style="text-align: center">
    <a class="btn btn-success" href="/Fatina/api/basic/">API Doc</a>
    <a class="btn btn-info" href="/Fatina/samples/advanced/">Samples</a>
</div>