+++
date = "2019-10-01T13:06:37+09:00"
title = "Getting Started"
toc = true
weight = 7

+++

### 1. Manual Installation

Download the [library](https://github.com/kefniark/Fatina/releases) and include it in your code:

```html
<script src="fatina.esm.js"></script>
```

<br>

### 1 bis. NPM Installation

More advanced users might want to use `npm`
```bash
npm install fatina
```

Then include the Fatina module :

```javascript
// standard import with typescript
import Fatina from 'fatina'

// OR standard node.js require
const Fatina = require('fatina')

// OR Deno
import Fatina from 'https://cdn.skypack.dev/fatina'
```

### 2. Done !
Now you can use **Fatina** properly :
```javascript
Fatina.tween( /* etc */ ).start();
```

### 3. Example with Tween ([Docs](/Fatina/api/tween/))
```javascript
const yourObj = { x: 0, y: 0 };

// Create a tween to move the object to the wanted position
Fatina.tween(yourObj)
  .to({ x: 100 }, 250)
  .onStart(() => console.log('animation finished !'))
  .onComplete(() => console.log('animation finished !'))
  .start();
```

### 4. Example with Transition Syntax ([Docs](/Fatina/api/transition/))
```javascript
const yourObj = { x: 0, y: 0 };

// Create a transition
const transition = Fatina.transition(yourObj);

// With Callback: Move the object to the wanted position in 250ms
transition.to({ x: 100 }, 250); // => return a tween

// With Async/Await: Move the object to the wanted position in 250ms and wait for the completion
await transition.promiseTo({ x: 200 }, 250);
```
<br>
<div style="text-align: center">
    <a class="btn btn-success" href="/Fatina/api/basic/">API Doc</a>
    <a class="btn btn-info" href="/Fatina/samples/advanced/">Samples</a>
</div>
