+++
date = "2017-05-21T13:06:37+09:00"
title = "Helpers Plugin"
toc = true
weight = 3

+++

### Description
This plugin is a set of helpers to provide a better integration of Fatina with javascript games library like **PixiJs** or **Phaser**.  It provides helpers to animate:

 * **Position**: Move, Shake, PunchPosition
 * **Rotation**: Rotate, PunchRotate
 * **Scale**: Scale, PunchScale
 * **Alpha**: Fade
 * **Color**: Color, PunchColor

This make the code smaller and easier to read
```js
// normal fatina tween
fatina.Tween(sprite.position, ['x']).To({'x': 50 }, 1000);

// same operation with the helper
sprite.MoveXTo(50, 1000);
```

This also provides conversion for angle and colors
```js
// degree rotation (default rotation are radiant)
sprite.RotateDegTo(90, 200);

// give a red tint to the sprite (most engine works with hex or rgba number array)
sprite.ColorRGBTo("#FF0000", 200);
```

<div style="text-align: center; margin-top: 30px;">
    <a class="btn btn-primary" href="https://github.com/kefniark/Fatina-Plugin-Helpers/" target="_blank">Github</a>
    <a class="btn btn-info" href="https://github.com/kefniark/Fatina-Plugin-Helpers/releases" target="_blank">Download</a>
    <a class="btn btn-success" href="https://www.npmjs.com/package/fatina-plugin-helpers" target="_blank">NPM</a>
    <a class="btn btn-success" href="#api">API</a>
    <a class="btn btn-info" href="#samples">Samples</a>
</div>

<br>

### 1. Usage
The installation process is explained in the [README](https://github.com/kefniark/Fatina-Plugin-Helpers).

After setup, you can use this plugin on any object: 
```js
Fatina.plugin.AddHelpers(obj);
```

### 2. Example with Phaser {#samples}
```js
// require tina
let fatina = require('fatina');
let fatinaHelpers = require('fatina-plugin-helpers');

// initialize tina
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

### 3. Advanced
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

### 4. API  {#api}

### Position
Following methods use `.position.x` and `.position.y`

* **MoveTo**(x: `number`, y: `number`, duration: `number`): Move to an absolute position
* **MoveXTo**(x: `number`, duration: `number`)
* **MoveYTo**(y: `number`, duration: `number`)
* **MoveToRel**(x: `number`, y: `number`, duration: `number`): Move to a relative position
* **MoveXToRel**(x: `number`, duration: `number`)
* **MoveYToRel**(y: `number`, duration: `number`)
* **PunchPosition**(x: `number`, y: `number`, duration: `number`, iteration: `number`): Oscillate around the current position
* **Shake**(x: `number`, y: `number`, duration: `number`, iteration: `number`): Shake around the current position

### Rotation
Following methods use `.rotation`

* **RotateTo**(rad: `number`, duration: `number`) : Rotate to a specific angle in radiant (to PI/2)
* **RotateToRel**(rad: `number`, duration: `number`) : Rotate by a relative radiant angle (+PI/2)
* **RotateDegTo**(deg: `number`, duration: `number`) : Rotate to a specific angle in degrees (to 90°)
* **RotateDegToRel**(deg: `number`, duration: `number`) : Rotate to a specific angle in degrees (+90°)
* **PunchRotate**(rad: `number`, duration: `number`, iteration: `number`)

### Alpha
Following method use `.alpha`

* **FadeTo**(alpha, duration: `number`) : Alpha is a float between 0 and 1 (1: fadeIn, 0: fadeOut)

### Scale
Following methods use `.scale.x` and `.scale.y`

* **ScaleTo**(x: `number`, y: `number`, duration: `number`) : Scale to a specified value
* **ScaleXTo**(x: `number`, duration: `number`)
* **ScaleYTo**(y: `number`, duration: `number`)
* **ScaleToRel**(x: `number`, y: `number`, duration: `number`)
* **ScaleXToRel**(x: `number`, duration: `number`)
* **ScaleYToRel**(y: `number`, duration: `number`)
* **PunchScale**(x: `number`, y: `number`, duration: `number`, iteration: `number`)

### Color / Tint
Following methods use `.tint` or `.hue` (the color API are slightly different between libs)

* **ColorTo**(r: `number`, g: `number`, b: `number`, duration: `number`): R,G,B are float between 0-1
* **ColorToRel**(r: `number`, g: `number`, b: `number`, duration: `number`)
* **ColorRGBTo**(color: `string`, duration: `number`): color is a string representation '#FFFFFF'
* **ColorRGBToRel**(color: `string`, duration: `number`)
* **PunchColor**(r: `number`, g: `number`, b: `number`, duration: `number`, iteration: `number`)