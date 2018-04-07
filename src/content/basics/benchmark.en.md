+++
date = "2017-05-21T13:06:37+09:00"
title = "Benchmark"
toc = true
weight = 2

+++

{{% code "static/benchmark/part1.html" %}}
{{%expand "See Code" %}}
```js
// Create a really simple tween on one property

// Fatina
Fatina.tween({x:0}, ['x']).to({x:100}, 10).start();

// Tina
new TINA.Tween({x:0}, ['x']).to({x:100}, 10).start();

// Tween.js
new TWEEN.Tween({x:0}, ['x']).to({x:100}, 10).start();
```
{{% /expand%}}

{{% code "static/benchmark/part2.html" %}}
{{%expand "See Code" %}}
```js
// Create a tween over 4 properties, with easing, looping & callbacks

// Fatina
Fatina.tween({x:0, y:0, z:0, a:0}, ['x', 'y', 'z', 'a'])
    .to({x:100, y:2, z:69, a:-71602}, Math.random() * 5 + 10)
    .setLoop(2)
    .setEasing('inOutQuad')
    .onStart(() => {})
    .onComplete(() => {})
    .start();

// Tina
new TINA.Tween({x:0, y:0, z:0, a:0}, ['x', 'y', 'z', 'a'])
    .to({x:100, y:2, z:69, a:-71602}, Math.random() * 5 + 10, TINA.easing.quadInOut)
    .iterations(2)
    .onStart(() => {})
    .onComplete(() => {})
    .start();

// Tween.js
new TWEEN.Tween({x:0, y:0, z:0, a:0}, ['x', 'y', 'z', 'a'])
    .to({x:100, y:2, z:69, a:-71602}, Math.random() * 5 + 10)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .repeat(2)
    .onStart(() => {})
    .onComplete(() => {})
    .start();
```
{{% /expand%}}

{{% code "static/benchmark/part3.html" %}}
{{%expand "See Code" %}}
```js
// Create a sequence of 2 simple tween with a interval in between

// Fatina
Fatina.sequence()
    .append(Fatina.tween({x:0}, ['x']).to({x: 2}, 2))
    .appendInterval(1)
    .append(Fatina.tween({x:0}, ['x']).to({x: 5}, 3))
    .start();

// Tina
new TINA.Sequence()
    .add(TINA.Tween({x:0}, ['x']).to({x:2}, 2))
    .addDelay(1)
    .add(TINA.Tween({x:0}, ['x']).to({x:5}, 3))
    .start();

// Tween.js (doesnt really support sequence or timeline, only chain)
let tweenA = new TWEEN.Tween({x:0}, ['x']).to({x:2}, 2);
let tweenB = new TWEEN.Tween({x:0}, ['x']).to({x:5}, 3).delay(1);
tweenA.chain(tweenB);
tweenA.start();
```
{{% /expand%}}

{{% code "static/benchmark/benchmark.html" %}}