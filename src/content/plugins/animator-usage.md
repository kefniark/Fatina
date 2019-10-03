+++
date = "2019-10-01T13:06:37+09:00"
title = "Animator Plugin - Getting Started"
toc = true
weight = 4

+++

<div style="text-align: center">
    <a class="btn btn-default" href="/Fatina/plugins/animator/">Animator</a>
    <a class="btn btn-primary" href="/Fatina/plugins/animator-usage/">Getting Started</a>
    <a class="btn btn-default" href="/Fatina/plugins/animator-api/">API</a>
</div>

The installation process is explained in the [README](https://github.com/kefniark/Fatina-Plugin-Animator).

After setup, you can use this plugin:
```js
// Global animator manager
Fatina.plugin.animatorManager;

// Global tick manager to be able to pause / resume group of objects
Fatina.plugin.tickerManager;

// Add a Animator component to any object
Fatina.plugin.animatorManager.addAnimatorTo(object);
```
<br>

### Import & Initialize
```js
// require fatina
let fatina = require('fatina');
let fatinaAnimator = require('fatina-plugin-animator');

// initialize fatina
fatina.init();
fatina.loadPlugin(fatinaAnimator.get());
```
<br>

### Register a shared animation
```js
fatina.plugin.animatorManager.register('move', (obj: any, params: any) => {
    return Fatina.tween(obj.position, ['x']).setRelative(true).to({ x: params }, 500);
}, 'newTicker');
```
<br>

### Play Animation
```js
// let's create a phaser sprite
var test = new Phaser.Sprite(this.game, 2, 80, 'hudBg');

// add a component animator to that sprite and add 2 animations
fatina.plugin.animatorManager.addAnimatorTo(test)
    .addAnimation('moveRight', 'move', { group: 'move' }, 5)
	.addAnimation('moveLeft', 'move', { group: 'move' }, -5);

// now you can use those animation easily
test.animator.play('moveLeft');
test.animator.play('moveRight');
```
