+++
date = "2019-10-01T13:06:37+09:00"
title = "Fatina API"
toc = true
weight = 2

+++

<div style="text-align: center">
    <a class="btn btn-primary" href="/Fatina/api/basic/">Fatina</a>
    <a class="btn btn-default" href="/Fatina/api/tween/">Tween</a>
    <a class="btn btn-default" href="/Fatina/api/sequence/">Sequence</a>
</div>

## Fatina
### Init
<blockquote>The first time you create a tween, Fatina will initialize itself automatically, using default values.
If instead you prefer to initialize it yourself (recommended), call the method <b>.init()</b> once, BEFORE creating any tween (calling it afterwards will have no effect).</blockquote>

### Controls
* **pause**() / **resume**(): `void`
* **setTimescale**(scale: number): `void`

### Methods
* **init**(): `void` <small>This method has to be called once to initialize Fatina</small>
* **update**(dt: number): `void`
* **tween**(obj): `Tween` <small>Method used to create new tween</small>
* **sequence**(): `Sequence` <small>Method used to create new sequence</small>
* **pulse**(obj, settings): `ISequence` Pulse preset
* **scale**(obj, settings): `ISequence` Scale preset
* **wobble**(obj, settings): `ISequence` Wobble preset
* **sonar**(obj, settings): `ISequence` Sonar preset
* **shake**(obj, settings): `ISequence` Shake preset
* **delay**(duration) `Delay`
* **setTimeout**(fn, duration): `void` This is just a simple helper around Fatina.Delay
* **setInterval**(fn, duration): `void` This is just a simple helper around Fatina.Delay
* **ticker**(name: string): `ITicker`

{{%expand "See More" %}}
For normal usage
```js
// Initialize Fatina (need to do that only once)
Fatina.init();

// Create a tween to move an object during 250 ms.
var obj = { x: 0, y: 0 };
ftina.tween(obj)
    .to({ x: 42, y: 42 }, 250)
    .start();
```

If you want to update Fatina manually
```js
// Initialize Fatina (disable the auto-update)
Fatina.init(false);

// Update manually (the default dt used by fatina is in ms.)
fatine.update(1);
```
{{% /expand%}}

<br>

## Ticker
<blockquote>A <b>Ticker</b> is a container which provides a centralized tick to all his childrens.<br>
By default, all the tweens are childs of the same default Ticker, but it's possible to change this behavior.</blockquote>

### Properties
* **isRunning**: `boolean`
* **isPaused**: `boolean`

### Controls
* **pause**() / **resume**(): `void`
* **setTimescale**(scale: number): `void`
* **kill**(): `void`

### Methods
* **addTick**(listener: (dt: number) => void): `void`;
* **removeTick**(listener: (dt: number) => void): `void`;

{{%expand "See More" %}}
```js
// Create few tickers
var gameTicker = Fatina.ticker('game');
var uiTicker = Fatina.ticker('ui');
uiTicker.SsetTimescale(0.8);

// You just have to tell to the tween or the sequence to use those ticker and not the default one
Fatina.tween(obj).setParent(gameTicker).to({x: 5}, 5).start();
Fatina.tween(obj).setParent(uiTicker).to({y: 5}, 5).start();
```
{{% /expand%}}