## Plugin Bezier

This plugin add new feature to Fatina, with predefined animation:
 * Shake
 * Wobble
 * Pulse
 * Scale
 * Sonar

## Setup

### HTML
```html
<script src="./fatina.js"></script>
<script src="./fatinaPreset.js"></script>
// ...
<script>
	Fatina.init();
	Fatina.loadPlugin(fatinaPreset.get());

	Fatina.shake(obj).start();
```

### Node
```ts
import Fatina, { IControl } from 'fatina';
import * as FatinaPluginPreset from 'fatina/build/plugins/fatinaPreset.js';
// ...
Fatina.init();
Fatina.loadPlugin(FatinaPluginPreset.get());
```

## API

### Pulse
Pulse the alpha property of a sprite
```ts
Fatina.pulse(sprite, {
	alpha: string; 'alpha', // name of the label property
	duration: number;
}): ITween
```
**Example**:
```ts
Fatina.pulse(sprite, {duration: 1000}).start();
```
### Scale
```ts
Fatina.scale(sprite, {
	scaleX: string; // default: `scale.x` (property X)
	scaleY: string; // default: `scale.y` (property Y)
	amplitude: number; // default: 0.5 (amplitude of the scale)
	duration: number; // default: 2000
	bounce: number; // default: 5 (number of bounce)
	friction: number; // default: 2 (attenuation over time)
}): ITween
```
**Example**:
```ts
Fatina.scale(sprite, {
	amplitude: 0.8,
	bounce: 8,
	duration: 3000
}).start();
```

### Shake
```ts
Fatina.shake(sprite, {
	posX: string; // default: `position.x` (property X)
	posY: string; // default: `position.y` (property Y)
	amplitude: number; // default: 1.5 (amplitude of the shake)
	duration: number;
	bounce: number; // default: 10 (number of bounce)
	friction: number; // default: 2 (attenuation over time)
})
```
**Example**:
```ts
Fatina.shake(sprite, {
	amplitude: 0.8,
	bounce: 8,
	duration: 3000
}).start();
```

### Sonar
```ts
Fatina.sonar(sprite, {
	alpha: string; // default: `alpha` (property alpha)
	scaleX: string; // default: `scale.x` (property X)
	scaleY: string; // default: `scale.y` (property Y)
	amplitude: number; // default: `4` (amplitude of the effect)
	duration: number; // default: `2000` (duration)
})
```
**Example**:
```ts
Fatina.sonar(sprite, {
	amplitude: 2,
	duration: 3000
}).start();
```

### Wobble
```ts
Fatina.wobble(sprite, {
	scaleX: string; // default: `scale.x` (property X)
	scaleY: string; // default: `scale.y` (property Y)
	amplitude: number; // default: 0.5 (amplitude of the wobble)
	duration: number; // default: 2000
	bounce: number; // default: 5 (number of bounce)
	friction: number; // default: 2 (attenuation over time)
}): ITween
```
**Example**:
```ts
Fatina.wobble(sprite, {
	amplitude: 0.8,
	bounce: 8,
	duration: 3000
}).start();
```