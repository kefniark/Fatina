+++
date = "2017-05-21T13:06:37+09:00"
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

### Controls
* **Start**(): `Tween` By default new tween are not started. Don't forget to call **.Start()**
* **Pause**(): `void`
* **Resume**(): `void`
* **Skip**(): `void`
* **Kill**(): `void`

{{%expand "See More" %}}
```js
// Create a tween
let tween = Fatina.Tween({},[]).To({}, 100).Start();

// Control this tween
tween.Pause();
tween.Resume();
tween.Kill(); 
```
{{% /expand%}}

### Callbacks
* **OnStart**(cb: () => void): `Tween`
* **OnUpdate**(cb: (dt: number, progress: number) => void): `Tween`
* **OnKilled**(cb: () => void): `Tween`
* **OnComplete**(cb: () => void): `Tween`

{{%expand "See More" %}}
```js
var obj = { x: 0 };

// Create a tween with few callbacks
Fatina.Tween(obj, ['x'])
    .To({ x: 42 }, 100)
    .OnStart(() => console.log('onStart'))
    .OnUpdate((dt, progress) => console.log('onUpdate', dt, progress)) // progress: float between 0 and 1
    .OnComplete(() => console.log('onComplete'))
    .Start();
```
{{% /expand%}}

### Methods
* **From**(from: any): `Tween`;
* **To**(to: any, duration: number): `Tween`;
* **Modify**(force: any, updateTo: boolean): `void`;
* **SetLoop**(loop: number): `Tween`;
* **SetRelative**(relative: boolean): `Tween`;
* **SetEasing**(type: EasingType | string): `Tween`;
* **SetTimescale**(scale: number): `Tween`;
* **ToSequence**(): `Sequence`;

{{%expand "See More" %}}
```js
var obj = { x: 0 };

// A normal Tween
Fatina.Tween(obj, ['x'])
    .From({ x: -10 }) // to define the starting value
    .To({ x: 10 }, 200) // to define the final value (absolute by default, for relative use .SetRelative(true))
    .SetLoop(2) // play this tween twice
    .SetTimescale(0.5) // play the tween at half the normal speed
    .Start(); // start the tween

// Convert to a sequence to use interval
Fatina.Tween(obj, ['x'])
    .From({ x: -10 })
    .To({ x: 10 }, 200)
    .ToSequence()
    .PrependInterval(150)
    .AppendInterval(150)
    .Start();
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
Fatina.Tween(obj, ['x'])
    .From({ x: -10 })
    .To({ x: 10 }, 200)
    .SetEasing('inOutQuad')
    .Start();
```
{{% /expand%}}