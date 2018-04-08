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
* **isRunning**: `boolean`
* **isFinished**: `boolean`
* **isPaused**: `boolean`

### Controls
* **start**(): `Sequence` By default new tween are not started. Don't forget to call **.start()**
* **pause**(): `void`
* **resume**(): `void`
* **kill**(): `void`

### Callbacks
* **onStart**(cb: () => void): `Sequence`;
* **onStepStart**(cb: (tween: ITween | IPlayable) => void): `Sequence` <small>Emitted when a tween start</small>
* **onStepEnd**(cb: (index: ITween | IPlayable) => void): `Sequence` <small>Emitted when a tween is completed.</small>
* **onUpdate**(cb: (dt: number, progress: number) => void): `Sequence`
* **onKilled**(cb: () => void): `Sequence`
* **onComplete**(cb: () => void): `Sequence`
* **onRestart**(cb: () => void): `Sequence`

### Methods
* **setTimescale**(scale: number): `Sequence`
* **setLoop**(loop: number): `Sequence`
* **append**(tween: ITween | ISequence): `Sequence` <small>Adds the given tween to the end of the Sequence.</small>
* **appendCallback**(cb: () => void): `Sequence`
* **appendInterval**(duration: number): `Sequence`
* **prepend**(tween: ITween| ISequence): `Sequence` <small>Adds the given tween to the beginning of the Sequence, pushing forward in time the rest of the contents.</small>
* **prependCallback**(cb: () => void): `Sequence`
* **prependInterval**(duration: number): `Sequence`
* **join**(tween: ITween | ISequence): `Sequence` <small>Inserts the given tween at the same time position of the last tween or callback added to the Sequence.</small>

{{%expand "See More" %}}
```js
// Wait 200ms and play 2 tween in parallel
Fatina.sequence()
    .appendInterval(200)
    .append(Fatina.tween(star, ['alpha']).to({ alpha: 0 }, 950).setEasing('outSine'))
    .join(Fatina.tween(star, ['x', 'y', 'rotation']).setRelative(true).to({ x: 0, y: 0, rotation: 12}, 1600))
    .onComplete(() => console.log('Sequence finished !'))
    .start();
```
{{% /expand%}}