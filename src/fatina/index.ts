import { Log } from './core/enum/log';
import { IControl } from './core/interfaces/IControl';
import { IPlayable } from './core/interfaces/IPlayable';
import { IPlugin } from './core/interfaces/IPlugin';
import { ISequence } from './core/interfaces/ISequence';
import { ITicker } from './core/interfaces/ITicker';
import { ITween } from './core/interfaces/ITween';
import { EasingType } from './easing/easingType';
import { Ticker as ticker } from './ticker';
import { Delay as delay } from './tweens/delay';
import { Sequence as sequence } from './tweens/sequence';
import { Tween as tween } from './tweens/tween';

let tickerManager: ticker;
let initialized = false;
let isFirstUpdate = true;
let lastFrame: any;
let lastTime = 0;
let logLevel = Log.None;
let safe = true;
const eventCreated: {(control: IControl): void}[] = [];

const loadedPlugins: IPlugin[] = [];

// Area for plugins to add helpers / dynamic method
export let plugin: any = {};

// Expose the easing enum
export { EasingType as Easing };

// real time of Fatina (not affected by timescale, pause, ...)
export let time = 0;

// time updated internally (affected by timescale, pause, ...)
export function Elapsed(): number {
	return tickerManager.elapsed;
}

export function MainTicker(): ITicker {
	if (!initialized) {
		Init();
	}
	return tickerManager;
}

/**
 * Add a listener method on tween/sequence creation
 *
 * @export
 * @param {(control: IControl) => void} cb
 */
export function AddListenerCreated(cb: (control: IControl) => void): void {
	eventCreated.push(cb);
}

/**
 * Remove a listener method on tween/sequence creation
 *
 * @export
 * @param {(control: IControl) => void} cb
 */
export function RemoveListenerCreated(cb: (control: IControl) => void): void {
	const index = eventCreated.indexOf(cb);
	if (index !== -1) {
		eventCreated.splice(index, 1);
	}
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
 * This method is used to change the log level
 *
 * @export
 * @param {Log} level
 */
export function SetLog(level: Log) {
	logLevel = level;
}

/**
 * This method is used to enable / disable the callback try/catch
 *
 * @export
 * @param {boolean} isSafe
 */
export function SetSafe(isSafe: boolean) {
	safe = isSafe;
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
	const t = new tween(obj, properties);
	AddContext(t);
	Info(Log.Debug, '[Fatina.Manager] Tween Instantiated', t);
	return t;
}

/**
 * Helper to create a Sequence (use the sequence pool)
 *
 * @export
 * @returns {ISequence}
 */
export function Sequence(): ISequence {
	const s = new sequence();
	AddContext(s);
	Info(Log.Debug, '[Fatina.Manager] Sequence Instantiated', s);
	return s;
}

/**
 * Helper to create a Delay
 *
 * @export
 * @param {number} duration
 * @returns {IPlayable}
 */
export function Delay(duration: number): IPlayable {
	const d = new delay(duration);
	AddContext(d);
	Info(Log.Debug, '[Fatina.Manager] Sequence Instantiated', d);
	return d;
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
	const timeout = new delay(duration).OnComplete(fn);
	AddContext(timeout);
	Info(Log.Debug, '[Fatina.Manager] SetTimeout Instantiated', timeout);
	return timeout.Start();
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
	const interval = new delay(duration).OnRestart(fn).SetLoop(-1);
	AddContext(interval);
	Info(Log.Debug, '[Fatina.Manager] SetInterval Instantiated', interval);
	return interval.Start();
}

/**
 * Private method to set common data to every object (the parent ticker, safe mode, verbose mode)
 *
 * @param {(IPlayable | ITween | ISequence)} obj
 */
function AddContext(obj: IPlayable | ITween | ISequence): void {
	if (!initialized) {
		Init();
	}

	obj.SetParent(tickerManager as ITicker);

	if (logLevel !== Log.None) {
		obj.SetLog(logLevel);
	}

	if (!safe) {
		obj.SetSafe(safe);
	}

	EmitCreated(obj);
}

/**
 * Create or Get a ticker with a defined name
 * This ticker is a child of the main ticker
 *
 * @export
 * @param {string} name
 * @returns {ITicker}
 */
export function Ticker(): ITicker {
	if (!initialized) {
		Init();
	}

	const tick = new ticker();
	const handler = tick.Tick.bind(tick);
	tick.SetParent(tickerManager, handler);
	tickerManager.AddTickListener(handler);
	tick.Start();

	EmitCreated(tick);
	Info(Log.Debug, '[Fatina.Manager] Ticker Instantiated', tick);
	return tick;
}

/**
 * Initialize a plugin by passing fatina object to it
 *
 * @export
 * @param {IPlugin} newPlugin
 */
export function LoadPlugin(newPlugin: IPlugin) {
	newPlugin.Init(this);
	loadedPlugins.push(newPlugin);
	Info(Log.Debug, '[Fatina.Manager] Plugin Loaded', newPlugin.name);
}

function Info(level: Log, message: string, data?: any) {
	if (level > logLevel) {
		return;
	}
	if (data) {
		console.log(message, data);
	} else {
		console.log(message);
	}
}

function Emit(func: any, tween: IControl) {
	if (!safe) {
		return func(tween);
	}

	try {
		func(tween);
	} catch (e) {
		console.warn(e);
	}
}

function EmitCreated(tween: IControl) {
	for (let i = 0; i < eventCreated.length; i++) {
		Emit(eventCreated[i], tween);
	}
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
