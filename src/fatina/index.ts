import { Sequence as sequence } from './tweens/sequence';
import { Ticker as ticker } from './ticker';
import { ITween } from './core/interfaces/ITween';
import { ISequence } from './core/interfaces/ISequence';
import { ITicker } from './core/interfaces/ITicker';
import { Pooling } from './pooling';
import { TweenType } from './core/enum/tweenType';

let requestFrame: any = window.requestAnimationFrame || (window as any).mozRequestAnimationFrame || window.webkitRequestAnimationFrame || (window as any).msRequestAnimationFrame;
let cancelFrame = window.cancelAnimationFrame || (window as any).mozCancelAnimationFrame;

function updateLoop(timestamp: number) {
	let dt = timestamp - time;
	Update(dt);
	time = timestamp;
	lastFrame = requestFrame(() => updateLoop);
}

let tickerManager: ticker | undefined;
let pooling: Pooling;
let initialized = false;
let lastFrame: any;
let time = 0;

export function Init(disableAutoTick?: boolean): boolean {
	if (initialized) {
		return false;
	}

	if (!tickerManager) {
		tickerManager = new ticker();
		tickerManager.Start();
	}

	if (!disableAutoTick) {
		lastFrame = requestFrame(updateLoop);
	}

	pooling = new Pooling(2000);

	initialized = true;
	return true;
}

export function Destroy() {
	if (tickerManager) {
		tickerManager.Kill();
		tickerManager = undefined;
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

	for (let clean of toClean) {
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
