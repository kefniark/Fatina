+++
date = "2019-10-01T13:06:37+09:00"
title = "Benchmark"
toc = true
weight = 2

+++

{{% code "static/benchmark/part1.html" %}}
{{%expand "See Code" %}}
```js
// Create a really simple tween on one property

// Fatina
Fatina.tween({x:0}).to({x:100}, 10).start();

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
Fatina.tween({x:0, y:0, z:0, a:0})
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
new new TWEEN.Tween({x:0, y:0, z:0, a:0}, ['x', 'y', 'z', 'a'])
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
Fatina.sequence([
    Fatina.tween({x:0}).to({x: 2}, 2),
    Fatina.delay(1),
    Fatina.tween({x:0}).to({x: 5}, 3),
    Fatina.tween({x:0}).to({x: -5}, 1),
    Fatina.tween({x:0}).to({x: 0}, 2)
]).start();

// Tina
new TINA.Sequence()
    .add(TINA.Tween({x:0}, ['x']).to({x:2}, 2))
    .addDelay(1)
    .add(TINA.Tween({x:0}, ['x']).to({x:5}, 3))
    .add(TINA.Tween({x:0}, ['x']).to({x:-5}, 1))
    .add(TINA.Tween({x:0}, ['x']).to({x:0}, 2))
    .start();

// Tween.js (doesnt really support sequence or timeline, only chain)
let tweenA = new TWEEN.Tween({x:0}, ['x']).to({x:2}, 2);
let tweenB = new TWEEN.Tween({x:0}, ['x']).to({x:5}, 3).delay(1);
let tweenC = new TWEEN.Tween({x:0}, ['x']).to({x:-5}, 1);
let tweenD = new TWEEN.Tween({x:0}, ['x']).to({x:0}, 2);
tweenC.chain(tweenD);
tweenB.chain(tweenC);
tweenA.chain(tweenB);
tweenA.start();
```
{{% /expand%}}

{{% code "static/benchmark/benchmark.html" %}}