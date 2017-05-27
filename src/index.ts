import { Sequence as sequence } from './tweens/sequence';
import { Ticker as ticker } from './ticker';
import { ITween } from './core/interfaces/ITween';
import { ISequence } from './core/interfaces/ISequence';
import { ITicker } from './core/interfaces/ITicker';
import { Pooling } from './pooling';
import { TweenType } from './core/enum/tweenType';

/**
 * Class used to auto-tick based on the browser requestAnimationFrame
 *
 * Based on API from mozilla :
 *  - https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame
 *  - https://developer.mozilla.org/fr/docs/Web/API/Window/cancelAnimationFrame
 *
 * @export
 * @class AutoTick
 */

// Update Loop (auto tick)
let tickerManager: ticker | undefined;
let pooling: Pooling;
let initialized = false;

// Request frame
let requestFrame: any = window.requestAnimationFrame || (window as any).mozRequestAnimationFrame || window.webkitRequestAnimationFrame || (window as any).msRequestAnimationFrame;
let cancelFrame = window.cancelAnimationFrame || (window as any).mozCancelAnimationFrame;
let lastFrame: any;
let time = 0;

function updateLoop(timestamp: number) {
	let dt = timestamp - time;
	this.Update(dt);
	time = timestamp;
	lastFrame = requestFrame(updateLoop);
}

export function Init(disableAutoTick?: boolean): any {
	if (initialized) {
		return;
	}

	if (!tickerManager) {
		tickerManager = new ticker();
		tickerManager.Start();
	}

	if (!disableAutoTick) {
		lastFrame = requestFrame(updateLoop);
	}

	pooling = new Pooling(500);

	initialized = true;
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
		}
	}
}

export function Deinit() {
	if (lastFrame) {
		cancelFrame(lastFrame);
	}

	if (tickerManager) {
		tickerManager.Kill();
		tickerManager = undefined;
	}

	initialized = false;
}

// Helpers
export function Ticker(): ITicker | undefined {
	return tickerManager;
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
