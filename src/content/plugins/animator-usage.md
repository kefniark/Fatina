+++
date = "2017-05-21T13:06:37+09:00"
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
Fatina.plugin.AnimatorManager;

// Global tick manager to be able to pause / resume group of objects
Fatina.plugin.TickerManager;

// Add a Animator component to any object
Fatina.plugin.AnimatorManager.AddAnimatorTo(object);
```
<br>

### Import & Initialize
```js
// require fatina
let fatina = require('fatina');
let fatinaAnimator = require('fatina-plugin-animator');

// initialize fatina
fatina.Init();
fatina.LoadPlugin(FatinaPluginAnimator.Get());
```
<br>

### Register a shared animation
```js
fatina.plugin.AnimatorManager.Register('move', (obj: any, params: any) => {
    return Fatina.Tween(obj.position, ['x']).SetRelative(true).To({ x: params }, 500);
}, 'newTicker');
```
<br>

### Play Animation
```js
// let's create a phaser sprite
var test = new Phaser.Sprite(this.game, 2, 80, 'hudBg');

// add a component animator to that sprite and add 2 animations
fatina.plugin.AnimatorManager.AddAnimatorTo(test)
    .AddAnimation('moveRight', 'move', { group: 'move' }, 5)
	.AddAnimation('moveLeft', 'move', { group: 'move' }, -5);

// now you can use those animation easily
test.Animator.Play('moveLeft');
test.Animator.Play('moveRight');
```
