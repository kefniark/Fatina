+++
date = "2017-05-21T13:06:37+09:00"
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
If instead you prefer to initialize it yourself (recommended), call the method <b>.Init()</b> once, BEFORE creating any tween (calling it afterwards will have no effect).</blockquote>

### Controls
* **Pause**() / **Resume**(): `void`
* **SetTimescale**(scale: number): `void`

### Methods
* **Init**(): `void` <small>This method has to be called once to initialize Fatina</small>
* **Update**(dt: number): `void`
* **Tween**(obj, properties): `Tween` <small>Method used to create new tween</small>
* **Sequence**(): `Sequence` <small>Method used to create new sequence</small>
* **Ticker**(name: string): `ITicker`

{{%expand "See More" %}}
For normal usage
```js
// Initialize Fatina (need to do that only once)
Fatina.Init();

// Create a tween to move an object during 250 ms.
var obj = { x: 0, y: 0 };
Fatina.Tween(obj, ['x', 'y'])
    .To({ x: 42, y: 42 }, 250)
    .Start();
```

If you want to update Fatina manually
```js
// Initialize Fatina (disable the auto-update)
Fatina.Init(false);

// Update manually (the default dt used by fatina is in ms.)
Fatine.Update(1);
```
{{% /expand%}}

<br>

## Ticker
<blockquote>A <b>Ticker</b> is a container which provides a centralized tick to all his childrens.<br>
By default, all the tweens are childs of the same default Ticker, but it's possible to change this behavior.</blockquote>

### Controls
* **Pause**() / **Resume**(): `void`
* **SetTimescale**(scale: number): `void`
* **Kill**(): `void`

### Methods
* **AddTickListener**(listener: (dt: number) => void): `void`;
* **RemoveTickListener**(listener: (dt: number) => void): `void`;

{{%expand "See More" %}}
```js
// Create few tickers
var gameTicker = Fatina.Ticker('game');
var uiTicker = Fatina.Ticker('ui');
uiTicker.SetTimescale(0.8);

// You just have to tell to the tween or the sequence to use those ticker and not the default one
Fatina.Tween(obj, ['x']).SetParent(gameTicker).To({x: 5}, 5).Start();
Fatina.Tween(obj, ['y']).SetParent(uiTicker).To({y: 5}, 5).Start();
```
{{% /expand%}}