+++
date = "2017-05-21T13:06:37+09:00"
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
Fatina.plugin.AddHelpers(obj);
```

### 1. Example (with Phaser)
```js
// require fatina
let fatina = require('fatina');
let fatinaHelpers = require('fatina-plugin-helpers');

// initialize fatina
fatina.Init();
fatina.LoadPlugin(fatinaHelpers.Get());

...

// let's create a phaser sprite
var test = new Phaser.Sprite(this.game, 2, 80, 'hudBg');

// use the plugin on this sprite
fatina.plugin.AddHelpers(test);

// use one helper function to move horizontaly the sprite to the position x = 50 in 1s.
test.MoveXTo(50, 1000);
```

### 2. Advanced
And all those helpers return **Tweens** or **Sequence**.
So you can interact and modify them

```js
// Create a tween
var tween = test.MoveXTo(50, 1000);

// you can easily get callback
tween.OnComplete(() => console.log('this animation finished'));

// or controls
tween.Pause();

// and by turning off the autostart parameter, you can even change the tween configuration
test.MoveXTo(50, 1000, false)
    .From({x: 0})
    .Yoyo(1)
    .OnComplete(() => console.log('the tween finished'))
    .ToSequence() // convert to a sequence
    .PrependInterval(1000)
    .Append(test.MoveYTo(50, 1000, false))
    .OnComplete(() => console.log('the sequence finished'))
    .Start();
```
