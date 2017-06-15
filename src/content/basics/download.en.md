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

<br>

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
Fatina.Tween( /* etc */ ).Start();
```
<br>
<div style="text-align: center">
    <a class="btn btn-success" href="/Fatina/api/basic/">API Doc</a>
    <a class="btn btn-info" href="/Fatina/samples/advanced/">Samples</a>
</div>