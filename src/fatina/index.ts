import { Sequence as sequence } from './tweens/sequence';
import { Ticker as ticker } from './ticker';
import { ITween } from './core/interfaces/ITween';
import { ISequence } from './core/interfaces/ISequence';
import { ITicker } from './core/interfaces/ITicker';
import { Pooling } from './pooling';
import { TweenType } from './core/enum/tweenType';

let requestFrame: any;
let cancelFrame: any;
if (typeof(window) !== 'undefined') {
	requestFrame = window.requestAnimationFrame || (window as any).mozRequestAnimationFrame || window.webkitRequestAnimationFrame || (window as any).msRequestAnimationFrame;
	cancelFrame = window.cancelAnimationFrame || (window as any).mozCancelAnimationFrame;
}

function updateLoop(timestamp: number) {
	let dt = timestamp - lastTime;
	if (isFirstUpdate) {
		dt = 1;
		isFirstUpdate = false;
	}
	Update(dt);
	lastTime = timestamp;
	lastFrame = requestFrame(updateLoop);
}

let tickerManager: ticker;
let pooling: Pooling;
let initialized = false;
let isFirstUpdate = true;
let lastFrame: any;
let lastTime = 0;

export let time = 0;
export function Elapsed() {
	return tickerManager.Elapsed;
}

export function Init(disableAutoTick?: boolean): boolean {
	if (initialized) {
		return false;
	}

	if (!tickerManager) {
		tickerManager = new ticker();
		tickerManager.Start();
	}

	if (typeof(window) !== 'undefined' && !disableAutoTick) {
		lastFrame = requestFrame(updateLoop);
	}

	pooling = new Pooling(1000);

	initialized = true;
	return true;
}

export function SetTimescale(scale: number): void {
	tickerManager.SetTimescale(scale);
}

export function Pause(): void {
	tickerManager.Pause();
}

export function Resume(): void {
	tickerManager.Resume();
}

export function Destroy() {
	if (tickerManager) {
		tickerManager.Kill();
	}

	if (lastFrame) {
		cancelFrame(lastFrame);
	}

	initialized = false;
}

export function Update(timestamp: number): any {
	if (!initialized || !tickerManager) {
		return;
	}

	let toClean = tickerManager.GetCleanTweens();

	tickerManager.Tick(timestamp);
	time += timestamp;

	for (let i = 0; i < toClean.length; i++) {
		let clean = toClean[i];
		if (clean.Type === TweenType.Tween) {
			pooling.PushTween(clean as ITween);
		} else if (clean.Type === TweenType.Sequence) {
			pooling.PushSequence(clean as ISequence);
		}
	}
}

export function Tween(obj: any, properties: string[]): ITween {
	if (!initialized) {
		Init();
	}

	let tween = pooling.PopTween();
	tween.Init(obj, properties);
	tween.SetParent(tickerManager as ITicker);
	return tween;
}

export function Sequence(): ISequence {
	if (!initialized) {
		Init();
	}
	return new sequence().SetParent(tickerManager as ITicker);
}
