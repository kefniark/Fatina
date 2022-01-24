+++
date = "2019-10-01T13:06:37+09:00"
title = "Transition API"
toc = true
weight = 5

+++

<div style="text-align: center">
    <a class="btn btn-default" href="/Fatina/api/basic/">Fatina</a>
    <a class="btn btn-default" href="/Fatina/api/tween/">Tween</a>
    <a class="btn btn-default" href="/Fatina/api/sequence/">Sequence</a>
    <a class="btn btn-primary" href="/Fatina/api/transition/">Transition</a>
</div>

<blockquote>
    <p>A <b>Transition</b> is a helper around tween to make their usage easier and less verbose for GUI or Webapps.</p>
    <p>It take care of most anoying parts automatically (defaults, creating tweens, avoiding duplicates, autostart, cleaning old tweens), and expose tween into a more code friendly async/await way.</p>
</blockquote>

### Methods
* **to**(to: any, duration: number): `Tween`;
* **toSpeed**(to: any, speed: number): `Tween`;
* **delay**(duration: number): `Tween`
* **promiseTo**(to: any, duration: number): `Promise<Tween>`;
* **promiseToSpeed**(to: any, speed: number): `Promise<Tween>`;
* **promiseDelay**(duration: number): `Promise<Tween>`
* **kill**(): `void`;

{{%expand "See More" %}}
```js
// Your object
const obj = { name: 'sprite', x: 0, y: 0 }

// Create a reusable transition around this object, so you dont have to keep a reference to the object everywhere
const transition = Fatina.transition(obj)

// Creating a UI Animation/Transition becomes one-liners
transition.to({ x: 1 })
transition.to({ y: 1 }, 1000)

// Transition return the active tween so you can interact with it and still get the power of tweens API
transition.to({ x: 0.5 })
  .setEasing('inOutElastic')
  .onComplete(() => console.log('The transition is completed !'))

// And it can become even more powerful with async/await, and can partially replace sequences and callbacks while being way more readable
transition.kill()
await transition.promiseTo({ x: 0 })
await transition.promiseDelay(100)
await transition.promiseTo({ x: 100 })
```
{{% /expand%}}
