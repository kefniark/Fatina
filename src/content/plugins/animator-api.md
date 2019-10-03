+++
title = "Animator Plugin - API"
toc = true
weight = 4

+++

<div style="text-align: center">
    <a class="btn btn-default" href="/Fatina/plugins/animator/">Animator</a>
    <a class="btn btn-default" href="/Fatina/plugins/animator-usage/">Getting Started</a>
    <a class="btn btn-primary" href="/Fatina/plugins/animator-api/">API</a>
</div>

### AnimatorManager
* **animations**: `string[]` names of registered animations
* **labels**: `string[]`
* **register**(name: `string`, onCreate: (object: `any`, params?: `any`) => IControl, label?: `string`): AnimatorManager;
* **addAnimatorTo**(obj: `any`): Animator;

### TickerManager
* **get**(name: `string`): ITicker;
* **pauseAll**(name: `string`): void;
* **resumeAll**(name: `string`): void;
* **killAll**(name: `string`): void;

### Animator
Animator component added to object you want to animate. This keep track of your animations and manage their states for you.

#### Animations
* **addAnimation**(name: `string`, animationName: `string`, options?: `IAnimationParams`, params?: `any`): `Animator`;
* **addCustomAnimation**(name: `string`, options: `IAnimationParams`, tween: `IControl`): `Animator`;

#### Controls
* **play**(name: `string`, onComplete?: () => void)
* **pause**(layer?: `string`): void;
* **pauseAll**(): void;
* **resume**(layer?: `string`): void;
* **resumeAll**(): void;
* **stop**(layer?: `string`): void;
* **stopAll**(): void;
* **destroy**(): void;

#### Events
* **onStart**(name: `string`, cb: () => void)
* **onStartAll**(name: `string`, cb: () => void)
* **onComplete**(name: `string`, cb: () => void)
* **onCompleteAll**(name: `string`, cb: () => void)

#### AnimationParams
When you add an animation, you have an option params
```js
{
	group: string; // Animation Group (default value: 'default')
	unstoppable?: boolean; // To create unstoppable animation (default: false)
	finalValue?: boolean; // To force the animation to always finish with final values, even if skipped
	next?: string // To force a transition to another animation on complete
}
```