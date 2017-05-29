+++
date = "2017-05-21T13:06:37+09:00"
title = "Fatina API"
toc = true
weight = 2

+++

Welcome to the API list of Fatina. (<a href="#tween">Tween</a>, <a href="#sequence">Sequence</a>, <a href="#easing">Easing</a>)

## Fatina

* **Init**(): `void` This method has to be called once to initialize fatina
* **Pause**() / **Resume**(): `void`
* **Update**(dt: number): `void`
* **SetTimescale**(scale: number): `void`
* **Tween**(obj, properties): `Tween`
* **Sequence**(): `Sequence`

{{%expand "See More" %}}
For normal usage
```js
// Initialize Fatina (need to do that only once)
Fatina.Init();

// Create a tween to move an object during 250 ms.
var obj = { x: 0, y: 0 };
Fatina.Tween(obj, ['x', 'y']).To({ x: 42, y: 42 }, 250).Start();
```

If you want to update Fatina manually
```js
// Initialize Fatina (disable the auto-update)
Fatina.Init(false);

// Update manually with
Fatine.Update(1);
```
{{% /expand%}}

## Tween {#tween}

### Properties
* **Elapsed**: `number` number of ms. elapsed for this tween <small>(affected by pause &amp; timescale)</small>
* **Duration**: `number` duration of this tween in ms.
* **IsRunning**(): `boolean`
* **IsCompleted**(): `boolean`
* **IsKilled**(): `boolean`

### Controls
* **Start**(): `Tween` By default new tween are not started. Don't forget to call **.Start()**
* **Pause**(): `void`
* **Resume**(): `void`
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
// Create a tween with few callbacks
Fatina.Tween({},[])
    .To({}, 100)
    .OnStart(() => console.log('onStart'))
    .OnUpdate((dt, progress) => console.log('onUpdate', dt, progress))
    .OnComplete(() => console.log('onComplete'))
    .Start();
```
{{% /expand%}}

### Methods
* **From**(from: any): Tween;
* **To**(to: any, duration: number): Tween;
* **SetLoop**(loop: number): Tween;
* **SetRelative**(relative: boolean): Tween;
* **SetEasing**(type: EasingType | string): Tween;
* **SetTimescale**(scale: number): Tween;
* **ToSequence**(): Sequence;

{{%expand "See More" %}}
```js
```
{{% /expand%}}

#### Easing {#easing}
The easing usable in **Tween.SetEasing(**...**)** are:
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

## Sequence  {#sequence}

### Properties

### Controls

### Callbacks
{{%expand "See More" %}}
```js
```
{{% /expand%}}

### Methods
{{%expand "See More" %}}
```js
```
{{% /expand%}}