+++
date = "2017-05-21T13:06:37+09:00"
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
* **Animations**: `string[]` names of registered animations
* **Labels**: `string[]`
* **Register**(name: `string`, onCreate: (object: `any`, params?: `any`) => IControl, label?: `string`): AnimatorManager;
* **AddAnimatorTo**(obj: `any`): Animator;

### TickerManager
* **Get**(name: `string`): ITicker;
* **PauseAll**(name: `string`): void;
* **ResumeAll**(name: `string`): void;
* **KillAll**(name: `string`): void;

### Animator
Animator component added to object you want to animate. This keep track of your animations and manage their states for you.

#### Animations
* **AddAnimation**(name: `string`, animationName: `string`, options?: `IAnimationParams`, params?: `any`): `Animator`;
* **AddCustomAnimation**(name: `string`, options: `IAnimationParams`, tween: `IControl`): `Animator`;

#### Controls
* **Play**(name: `string`, onComplete?: () => void)
* **Pause**(layer?: `string`): void;
* **PauseAll**(): void;
* **Resume**(layer?: `string`): void;
* **ResumeAll**(): void;
* **Stop**(layer?: `string`): void;
* **StopAll**(): void;
* **Destroy**(): void;

#### Events
* **OnStart**(name: `string`, cb: () => void)
* **OnStartAll**(name: `string`, cb: () => void)
* **OnComplete**(name: `string`, cb: () => void)
* **OnCompleteAll**(name: `string`, cb: () => void)


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