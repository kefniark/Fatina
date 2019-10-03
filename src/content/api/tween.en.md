+++
date = "2019-10-01T13:06:37+09:00"
title = "Tween API"
toc = true
weight = 3

+++

<div style="text-align: center">
    <a class="btn btn-default" href="/Fatina/api/basic/">Fatina</a>
    <a class="btn btn-primary" href="/Fatina/api/tween/">Tween</a>
    <a class="btn btn-default" href="/Fatina/api/sequence/">Sequence</a>
</div>

<blockquote>
    <p>A <b>Tween</b> that takes control of values and animates them.</p>
</blockquote>

### Properties
* **elapsed**: `number` number of ms. elapsed for this tween <small>(affected by pause &amp; timescale)</small>
* **duration**: `number` duration of this tween in ms.
* **isRunning**: `boolean`
* **isFinished**: `boolean`
* **isPaused**: `boolean`

### Controls
* **start**(): `Tween` By default new tween are not started. Don't forget to call **.start()**
* **pause**(): `void`
* **resume**(): `void`
* **skip**(): `void`
* **kill**(): `void`

{{%expand "See More" %}}
```js
// Create a tween
let tween = Fatina.tween({}).to({}, 100).start();

// Control this tween
tween.pause();
tween.resume();
tween.kill();
```
{{% /expand%}}

### Callbacks
* **onStart**(cb: () => void): `Tween`
* **onUpdate**(cb: (dt: number, progress: number) => void): `Tween`
* **onKilled**(cb: () => void): `Tween`
* **onComplete**(cb: () => void): `Tween`
* **onRestart**(cb: () => void): `Tween`

{{%expand "See More" %}}
```js
var obj = { x: 0 };

// Create a tween with few callbacks
Fatina.tween(obj)
    .to({ x: 42 }, 100)
    .onStart(() => console.log('onStart'))
    .onUpdate((dt, progress) => console.log('onUpdate', dt, progress)) // progress: float between 0 and 1
    .onComplete(() => console.log('onComplete'))
    .start();
```
{{% /expand%}}

### Methods
* **from**(from: any): `Tween`;
* **to**(to: any, duration: number): `Tween`;
* **modify**(force: any, updateTo: boolean): `void`;
* **setLoop**(loop: number): `Tween`;
* **setRelative**(relative: boolean): `Tween`;
* **setEasing**(type: EasingType | string): `Tween`;
* **setTimescale**(scale: number): `Tween`;
* **setSteps**(steps: number): `Tween`;
* **yoyo**(times: number): `Tween`;
* **reverse**(): `void`;
* **toSequence**(): `Sequence`;

{{%expand "See More" %}}
```js
var obj = { x: 0 };

// A normal Tween
Fatina.tween(obj)
    .from({ x: -10 }) // to define the starting value
    .to({ x: 10 }, 200) // to define the final value (absolute by default, for relative use .SetRelative(true))
    .setLoop(2) // play this tween twice
    .setTimescale(0.5) // play the tween at half the normal speed
    .start(); // start the tween

// Convert to a sequence to use interval
Fatina.tween(obj)
    .from({ x: -10 })
    .to({ x: 10 }, 200)
    .toSequence()
    .prependInterval(150)
    .appendInterval(150)
    .start();
```
{{% /expand%}}

<br>
#### Easing {#easing}
The possible easing method usable in **Tween.SetEasing(**...**)** are: <br>
`linear`,
`inQuad`,
`outQuad`,
`inOutQuad`,
`inCubic`,
`outCubic`,
`inOutCubic`,
`inQuart`,
`outQuart`,
`inOutQuart`,
`inSine`,
`outSine`,
`inOutSine`,
`inCirc`,
`outCirc`,
`inOutCirc`,
`inQuint`,
`outQuint`,
`inOutQuint`,
`inExponential`,
`outExponential`,
`inOutExponential`,
`inElastic`,
`outElastic`,
`inOutElastic`,
`inBack`,
`outBack`,
`inOutBack`,
`inBounce`,
`outBounce`,
`inOutBounce`

To see what they look like : [Easings.net](http://easings.net)

{{%expand "See More" %}}
```js
var obj = { x: 0 };

// A tween with easing
Fatina.tween(obj)
    .from({ x: -10 })
    .to({ x: 10 }, 200)
    .setEasing('inOutQuad')
    .start();
```
{{% /expand%}}