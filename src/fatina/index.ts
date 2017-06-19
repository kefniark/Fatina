import { Sequence as sequence } from './tweens/sequence';
import { Tween as tween } from './tweens/tween';
import { Delay as delay } from './tweens/delay';
import { Ticker as ticker } from './ticker';
import { ITween } from './core/interfaces/ITween';
import { ISequence } from './core/interfaces/ISequence';
import { ITicker } from './core/interfaces/ITicker';
import { EasingType } from './easing/easingType';
import { IPlayable } from './core/interfaces/IPlayable';

let tickerManager: ticker;
let initialized = false;
let isFirstUpdate = true;
let lastFrame: any;
let lastTime = 0;
let tickers: {[id: string]: ITicker } = {};

// Expose the easing enum
export { EasingType as Easing };

// real time of Fatina (not affected by timescale, pause, ...)
export let time = 0;

// time updated internally (affected by timescale, pause, ...)
export function Elapsed() {
	return tickerManager.elapsed;
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
	if (!initialized) {
		Init();
	}
	tickerManager.SetTimescale(scale);
}

/**
 * This method pause the update loop (update are not called anymore)
 *
 * @export
 */
export function Pause(): void {
	if (!initialized) {
		Init();
	}
	tickerManager.Pause();
}

/**
 * This method resume the update loop (works only if the game was paused before)
 *
 * @export
 */
export function Resume(): void {
	if (!initialized) {
		Init();
	}
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
	tickerManager.Tick(timestamp);
	time += timestamp;
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

	return new tween(obj, properties).SetParent(tickerManager as ITicker);
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
 * Helper to create a Delay
 *
 * @export
 * @param {number} duration
 * @returns {IPlayable}
 */
export function Delay(duration: number): IPlayable {
	if (!initialized) {
		Init();
	}

	return new delay(duration).SetParent(tickerManager as ITicker);
}

/**
 * Helper used to replace usage of normal js setTimeout() by a tween
 * https://www.w3schools.com/jsref/met_win_settimeout.asp
 *
 * @export
 * @param {() => void} fn
 * @param {number} duration
 * @returns {IPlayable}
 */
export function SetTimeout(fn: () => void, duration: number): IPlayable {
	if (!initialized) {
		Init();
	}

	return new delay(duration).SetParent(tickerManager as ITicker).OnComplete(fn).Start();
}

/**
 * Helper used to replace usage of normal js setInterval() by a tween
 * https://www.w3schools.com/jsref/met_win_setinterval.asp
 *
 * @export
 * @param {() => void} fn
 * @param {number} duration
 * @returns {IPlayable}
 */
export function SetInterval(fn: () => void, duration: number): IPlayable {
	if (!initialized) {
		Init();
	}

	return new delay(duration).SetParent(tickerManager as ITicker).OnRestart(fn).SetLoop(-1).Start();
}

/**
 * Create or Get a ticker with a defined name
 * This ticker is a child of the main ticker
 *
 * @export
 * @param {string} name
 * @returns {(ITicker | undefined)}
 */
export function Ticker(name: string): ITicker {
	if (!initialized) {
		Init();
	}

	// Create a ticker with that name
	if (!(name in tickers)) {
		let tick = new ticker();
		let handler = tick.Tick.bind(tick);
		tick.SetParent(tickerManager, handler);
		tickerManager.AddTickListener(handler);
		tick.Start();

		tickers[name] = tick;
	}

	return tickers[name];
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
