+++
date = "2017-05-21T13:06:37+09:00"
title = "Getting Started"
toc = true
weight = 7

+++

## Installation

Download the [library](...) and include it in your code:

```html
<script src="js/Fatina.min.js"></script>
```

You can also reference a CDN-hosted version in your code, thanks to cdnjs. For example:

```html
<script src="..."></script>
```

### More advanced users might want to...

#### Use `npm`

```bash
npm install Fatina
```

Then include the Fatina module with the standard node.js `require`:

```javascript
var Fatina = require('Fatina');
```

And you can use Tween.js as in all other samples :
```javascript
var t = new Fatina.Tween( /* etc */ );
t.start();
```