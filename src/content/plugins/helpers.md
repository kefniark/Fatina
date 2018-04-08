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
Fatina.tween(sprite.position, ['x']).to({'x': 50 }, 1000);

// same operation with the helper
sprite.moveXTo(50, 1000);
```

This also provides conversion for angle and colors
```js
// degree rotation (default rotation are radiant)
sprite.rotateDegTo(90, 200);

// give a red tint to the sprite (most engine works with hex or rgba number array)
sprite.colorRGBTo("#FF0000", 200);
```

<div style="text-align: center; margin-top: 30px;">
    <a class="btn btn-primary" href="https://github.com/kefniark/Fatina-Plugin-Helpers/" target="_blank">Github</a>
    <a class="btn btn-info" href="https://github.com/kefniark/Fatina-Plugin-Helpers/releases" target="_blank">Download</a>
    <a class="btn btn-success" href="https://www.npmjs.com/package/fatina-plugin-helpers" target="_blank">NPM</a>
    <a class="btn btn-default" href="/Fatina/plugins/helpers-usage/">Getting Started</a>
    <a class="btn btn-default" href="/Fatina/plugins/helpers-api/">API</a>
</div>