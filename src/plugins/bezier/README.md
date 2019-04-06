## Plugin Bezier

This plugin add new feature to Fatina, to be able to handle trajectory:
* Bezier curve (Quadratic, Cubic)
* Arc curve
* Path

## Setup

### HTML
```html
<script src="./fatina.js"></script>
<script src="./fatinaBezier.js"></script>
// ...
<script>
    Fatina.init();
    Fatina.loadPlugin(fatinaBezier.get());

    Fatina.shake(obj).start();
```

### Node
```ts
import Fatina, { IControl } from 'fatina';
import * as FatinaPluginBezier from 'fatina/build/plugins/fatinaBezier.js';
// ...
Fatina.init();
Fatina.loadPlugin(FatinaPluginBezier.get());
```

## API

### Curve
Bezier curve use control points to bend the trajectory, but the object is not going through those points.
```ts
Fatina.curve(sprite, {
	posX: string; // default: `position.x` (property X)
	posY: string; // default: `position.y` (property Y)
	rot: string; // default: `rotation` (property Rotation)
	rotAdd: number; // default: `0` (use to modify the rotation)
	autoRotate: boolean; // default: true
	from: IVector2; // from position
	to: IVector2; // to position
	ctr1: IVector2; // position of 1st control point
	ctr2: IVector2; // position of 2nd control point
	duration: number; // duration
	method: 'cubic' | 'quadratic' // method to use
}): ITween
```
**Example**:
```ts
Fatina.curve(sprite, {
	ctr1: { x: 5, y: 0 }, // 1st point
	ctr2: { x: 10, y: 0 }, // 2nd point
	to: { x: 25, y: 25 }, // destination
	duration: 2500,
	method: 'cubic'
}).start();
```

Difference between Cubic bezier (2 control point) and Quadratic bezier (1 control point)

![Bezier](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcii6YWV0_av6Q-NboTdyLdG2fMPZkhkdgWjoGS7ncLiNnH3w9ig)

### Arc
Use an arc passing through the start the end point and the control point ([more info](https://www.redblobgames.com/articles/curved-paths/#arcs))
```ts
Fatina.arc(sprite, {
	posX: string; // default: `position.x` (property X)
	posY: string; // default: `position.y` (property Y)
	rot: string; // default: `rotation` (property Rotation)
	rotAdd: number; // default: `0` (use to modify the rotation)
	autoRotate: boolean; // default: true
	ctr1: IVector2; // position of 1st control point
	to: IVector2; // to position
	duration: number; // duration
})
```
**Example**:
```ts
Fatina.arc(sprite, {
	ctr1: { x: 10, y: 5 }, // 1st point
	to: { x: 25, y: 25 }, // destination
	duration: 2500
}).start();
```

### Path
Create a path going through a list of points (you can think a sequence of curve)

```ts
Fatina.arc(sprite, {
	posX: string; // default: `position.x` (property X)
	posY: string; // default: `position.y` (property Y)
	points: IVector2[];  // default: `[]` (list of point to go through)
	duration: number; // duration
	method: 'linear' | 'catmull'; // method to use
}
```
**Example**:
```ts
Fatina.path(sprite, {
	points: [
		{ x: 5, y: 5 },
		{ x: 25, y: 10 },
		{ x: 20, y: 25 },
		{ x: 0, y: 0 },
		{ x: 10, y: 10 },
		{ x: 25, y: 25 }
	],
	method: 'catmull',
	duration: 2500
}).start();
```

The [catmull spline](https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline) algorithm allow to smooth the path while still going through each point