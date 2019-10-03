+++
date = "2019-10-01T13:06:37+09:00"
title = "Helpers Plugin - Getting Started"
toc = true
weight = 3

+++

<div style="text-align: center">
    <a class="btn btn-default" href="/Fatina/plugins/helpers/">Helpers</a>
    <a class="btn btn-primary" href="/Fatina/plugins/helpers-usage/">Getting Started</a>
    <a class="btn btn-default" href="/Fatina/plugins/helpers-api/">API</a>
</div>


The installation process is explained in the [README](https://github.com/kefniark/Fatina-Plugin-Helpers).

After setup, you can use this plugin on any object:
```js
Fatina.plugin.addHelpers(obj);
```

### 1. Example (with Phaser)
```js
// require fatina
let fatina = require('fatina').default;
let fatinaHelpers = require('fatina-plugin-helpers');

// initialize fatina
fatina.init();
fatina.loadPlugin(fatinaHelpers.get());

...

// let's create a phaser sprite
var test = new Phaser.Sprite(this.game, 2, 80, 'hudBg');

// use the plugin on this sprite
fatina.plugin.addHelpers(test);

// use one helper function to move horizontaly the sprite to the position x = 50 in 1s.
test.moveXTo(50, 1000);
```

### 2. Advanced
And all those helpers return **Tweens** or **Sequence**.
So you can interact and modify them

```js
// Create a tween
var tween = test.moveXTo(50, 1000);

// you can easily get callback
tween.onComplete(() => console.log('this animation finished'));

// or controls
tween.pause();

// and by turning off the autostart parameter, you can even change the tween configuration
test.moveXTo(50, 1000, false)
    .from({x: 0})
    .yoyo(1)
    .onComplete(() => console.log('the tween finished'))
    .toSequence() // convert to a sequence
    .prependInterval(1000)
    .append(test.moveYTo(50, 1000, false))
    .onComplete(() => console.log('the sequence finished'))
    .start();
```
