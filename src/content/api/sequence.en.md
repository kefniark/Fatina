+++
date = "2017-05-21T13:06:37+09:00"
title = "Sequence API"
toc = true
weight = 4

+++

<div style="text-align: center">
    <a class="btn btn-default" href="/Fatina/api/basic/">Fatina</a>
    <a class="btn btn-default" href="/Fatina/api/tween/">Tween</a>
    <a class="btn btn-primary" href="/Fatina/api/sequence/">Sequence</a>
</div>

<blockquote>
    <p>A <b>Sequence</b> is special tween that, instead of taking control of a value, takes control of other tweens and animates them as a group.</p>
</blockquote>

### Properties
* **elapsed**: `number` number of ms. elapsed for this sequence <small>(affected by pause &amp; timescale)</small>

### Controls
* **Start**(): `Sequence` By default new tween are not started. Don't forget to call **.Start()**
* **Pause**(): `void`
* **Resume**(): `void`
* **Kill**(): `void`

### Callbacks
* **OnStart**(cb: () => void): `Sequence`;
* **OnStepStart**(cb: (tween: ITween | IPlayable) => void): `Sequence` <small>Emitted when a tween start</small>
* **OnStepEnd**(cb: (index: ITween | IPlayable) => void): `Sequence` <small>Emitted when a tween is completed.</small>
* **OnUpdate**(cb: (dt: number, progress: number) => void): `Sequence`
* **OnKilled**(cb: () => void): `Sequence`
* **OnComplete**(cb: () => void): `Sequence`

### Methods
* **SetTimescale**(scale: number): `Sequence`
* **SetLoop**(loop: number): `Sequence`
* **Append**(tween: ITween | ISequence): `Sequence` <small>Adds the given tween to the end of the Sequence.</small>
* **AppendCallback**(cb: () => void): `Sequence`
* **AppendInterval**(duration: number): `Sequence`
* **Prepend**(tween: ITween| ISequence): `Sequence` <small>Adds the given tween to the beginning of the Sequence, pushing forward in time the rest of the contents.</small>
* **PrependCallback**(cb: () => void): `Sequence`
* **PrependInterval**(duration: number): `Sequence`
* **Join**(tween: ITween | ISequence): `Sequence` <small>Inserts the given tween at the same time position of the last tween or callback added to the Sequence.</small>

{{%expand "See More" %}}
```js
// Wait 200ms and play 2 tween in parallel
Fatina.Sequence()
    .AppendInterval(200)
    .Append(Fatina.Tween(star, ['alpha']).To({ alpha: 0 }, 950).SetEasing('outSine'))
    .Join(Fatina.Tween(star, ['x', 'y', 'rotation']).SetRelative(true).To({ x: 0, y: 0, rotation: 12}, 1600))
    .OnComplete(() => console.log('Sequence finished !'))
    .Start();
```
{{% /expand%}}