import { Sequence as sequence } from './tweens/sequence';
import { Ticker as ticker } from './ticker';
import { ITween } from './core/interfaces/ITween';
import { ISequence } from './core/interfaces/ISequence';
import { ITicker } from './core/interfaces/ITicker';
import { TweenPool } from './pooling/tweenPool';
import { SequencePool } from './pooling/sequencePool';

let tickerManager: ticker;
let tweenPooling: TweenPool;
let sequencePooling: SequencePool;
let initialized = false;
let isFirstUpdate = true;
let lastFrame: any;
let lastTime = 0;

// real time of Fatina (not affected by timescale, pause, ...)
export let time = 0;

// time updated internally (affected by timescale, pause, ...)
export function Elapsed() {
	return tickerManager.Elapsed;
}

/**
 * Method used when Fatina is used for the first time.
 * Can take few ms. (pool initialization & object creation)
 *
 * @export
 * @param {boolean} [disableAutoTick]
 * @returns {boolean}
 */
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

	tweenPooling = new TweenPool(1000);
	sequencePooling = new SequencePool(250);

	initialized = true;
	return true;
}

/**
 * Used to change the timescale of the whole game
 *
 * @export
 * @param {number} scale
 */
export function SetTimescale(scale: number): void {
	tickerManager.SetTimescale(scale);
}

/**
 * This method pause the update loop (update are not called anymore)
 *
 * @export
 */
export function Pause(): void {
	tickerManager.Pause();
}

/**
 * This method resume the update loop (works only if the game was paused before)
 *
 * @export
 */
export function Resume(): void {
	tickerManager.Resume();
}

/**
 * This method kill the main ticker, the pool of tween and stop any requestAnimationFrame
 *
 * @export
 */
export function Destroy() {
	if (tickerManager) {
		tickerManager.Kill();
	}

	if (lastFrame) {
		cancelFrame(lastFrame);
	}

	initialized = false;
}

/**
 * Method used to tick all the child (tween or sequence)
 * This takes cares of recycling the old tween/sequence
 *
 * @export
 * @param {number} timestamp
 * @returns {*}
 */
export function Update(timestamp: number): any {
	if (!initialized || !tickerManager) {
		return;
	}

	tickerManager.GetCleanTweens();

	tickerManager.Tick(timestamp);
	time += timestamp;

	/*
	for (let i = 0; i < toClean.length; i++) {
		let clean = toClean[i];
		if (clean.Type === TweenType.Tween) {
			tweenPooling.PushTween(clean as ITween);
		} else if (clean.Type === TweenType.Sequence) {
			sequencePooling.PushSequence(clean as ISequence);
		}
	}
	*/
}

/**
 * Helper to create a tween (use the tween pool)
 *
 * @export
 * @param {*} obj
 * @param {string[]} properties
 * @returns {ITween}
 */
export function Tween(obj: any, properties: string[]): ITween {
	if (!initialized) {
		Init();
	}

	let tween = tweenPooling.PopTween();
	tween.Init(obj, properties);
	tween.SetParent(tickerManager as ITicker);
	return tween;
}

/**
 * Helper to create a Sequence (use the sequence pool)
 *
 * @export
 * @returns {ISequence}
 */
export function Sequence(): ISequence {
	if (!initialized) {
		Init();
	}
	return new sequence().SetParent(tickerManager as ITicker);
}

/**
 * This part manage the auto-update loop if necessary (browser only)
 */
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

	// cap to 500 ms
	if (dt > 500) {
		console.warn('[Fatina] Delta between two update was too high ' + Math.round(dt) + 'ms. , Capped to 500ms.');
		dt = 500;
	}

	Update(dt);
	lastTime = timestamp;
	lastFrame = requestFrame(updateLoop);
}
