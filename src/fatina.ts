
import { Log } from './core/enum/log';
import { IControl } from './core/interfaces/IControl';
import { IPlayable } from './core/interfaces/IPlayable';
import { IPlugin } from './core/interfaces/IPlugin';
import { ISequence } from './core/interfaces/ISequence';
import { ISettings } from './core/interfaces/ISettings';
import { ITicker } from './core/interfaces/ITicker';
import { ITween } from './core/interfaces/ITween';
import { EasingType } from './easing/easingType';
import { Ticker } from './ticker';
import { Delay } from './tweens/delay';
import { Sequence } from './tweens/sequence';
import { Tween } from './tweens/tween';

/**
 * This part manage the auto-update loop if necessary (browser only)
 */
let lastFrame: any;
let requestFrame: any;
let cancelFrame: any;
if (typeof(window) !== 'undefined') {
	requestFrame = window.requestAnimationFrame || (window as any).mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame || (window as any).msRequestAnimationFrame;
	cancelFrame = window.cancelAnimationFrame || (window as any).mozCancelAnimationFrame;
}

/**
 * Main class exposed as fatina library
 *
 * @export
 * @class Fatina
 */
export class Fatina {
	public easing = EasingType;

	// plugins
	public plugin: any = {};
	private readonly loadedPlugins: IPlugin[] = [];
	private readonly eventCreated: {(control: IControl): void}[] = [];

	// settings
	private readonly settings = { logLevel: Log.None, safe: true } as ISettings;

	// properties
	public time = 0;
	private lastTime = 0;
	private initialized = false;
	private isFirstUpdate = true;
	public manager: Ticker;

	public get elapsed(): number {
		return this.manager.elapsed;
	}

	public get mainTicker(): ITicker {
		if (!this.initialized) {
			this.init();
		}
		return this.manager;
	}

	/**
	 * Method used when Fatina is used for the first time.
	 * Can take few ms. (pool initialization & object creation)
	 *
	 * @export
	 * @param {boolean} [disableAutoTick]
	 * @returns {boolean}
	 */
	public init(disableAutoTick?: boolean): boolean {
		if (this.initialized) {
			return false;
		}

		if (!this.manager) {
			this.manager = new Ticker();
			this.manager.start();
		}

		if (typeof(window) !== 'undefined' && !disableAutoTick) {
			lastFrame = requestFrame(this.updateLoop.bind(this));
		}

		this.initialized = true;
		return true;
	}

	/**
	 * Used to change the timescale of the whole game
	 *
	 * @export
	 * @param {number} scale
	 */
	public setTimescale(scale: number): void {
		this.init();
		this.manager.setTimescale(scale);
	}

	/**
	 * This method pause the update loop (update are not called anymore)
	 *
	 * @export
	 */
	public pause(): void {
		this.init();
		this.manager.pause();
	}

	/**
	 * This method resume the update loop (works only if the game was paused before)
	 *
	 * @export
	 */
	public resume(): void {
		this.init();
		this.manager.resume();
	}

	/**
	 * This method kill the main ticker, the pool of tween and stop any requestAnimationFrame
	 *
	 * @export
	 */
	public destroy() {
		if (this.manager) {
			this.manager.kill();
		}

		if (lastFrame) {
			cancelFrame(lastFrame);
		}

		this.initialized = false;
	}

	/**
	 * Method used to tick all the child (tween or sequence)
	 * This takes cares of recycling the old tween/sequence
	 *
	 * @export
	 * @param {number} timestamp
	 * @returns {*}
	 */
	public update(timestamp: number): any {
		if (!this.initialized || !this.manager) {
			return;
		}
		this.manager.tick(timestamp);
		this.time += timestamp;
	}

	/**
	 * Helper to create a tween (use the tween pool)
	 *
	 * @export
	 * @param {*} obj
	 * @param {string[]} properties
	 * @returns {ITween}
	 */
	public tween(obj: any, properties: string[]): ITween {
		const t = new Tween(obj, properties);
		this.addContext(t);
		return t;
	}

	/**
	 * Helper to create a Sequence (use the sequence pool)
	 *
	 * @export
	 * @param {(tween[] | sequence[])} [list]
	 * @returns {ISequence}
	 */
	public sequence(list?: Tween[] | Sequence[] | IPlayable[]): ISequence {
		const s = new Sequence(list);
		this.addContext(s);
		return s;
	}

	/**
	 * Helper to create a Delay
	 *
	 * @export
	 * @param {number} duration
	 * @returns {IPlayable}
	 */
	public delay(duration: number): IPlayable {
		const d = new Delay(duration);
		this.addContext(d);
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
	public setTimeout(fn: () => void, duration: number): IPlayable {
		const timeout = new Delay(duration).onComplete(fn);
		this.addContext(timeout);
		return timeout.start();
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
	public setInterval(fn: () => void, duration: number): IPlayable {
		const interval = new Delay(duration).onRestart(fn).setLoop(-1);
		this.addContext(interval);
		return interval.start();
	}

	/**
	 * Private method to set common data to every object (the parent ticker, safe mode, verbose mode)
	 *
	 * @param {(IPlayable | ITween | ISequence)} obj
	 */
	private addContext(obj: IPlayable | ITween | ISequence): void {
		if (!this.initialized) {
			this.init();
		}

		obj.setParent(this.manager as ITicker);

		if (this.settings.logLevel !== Log.None || !this.settings.safe) {
			obj.setSettings(this.settings);
		}

		this.emitCreated(obj);
	}

	/**
	 * Create or Get a ticker with a defined name
	 * This ticker is a child of the main ticker
	 *
	 * @export
	 * @param {string} name
	 * @returns {ITicker}
	 */
	public ticker(): ITicker {
		if (!this.initialized) {
			this.init();
		}

		const tick = new Ticker();
		const handler = tick.tick.bind(tick);
		tick.setParent(this.manager, handler);
		this.manager.addTick(handler);
		tick.start();

		this.emitCreated(tick);
		return tick;
	}

	private updateLoop(timestamp: number) {
		let dt = timestamp - this.lastTime;
		if (this.isFirstUpdate) {
			dt = 1;
			this.isFirstUpdate = false;
		}

		// cap to 500 ms
		if (dt > 350) {
			console.warn(`dt too high ${Math.round(dt)}ms. , Capped to 350ms.`);
			dt = 350;
		}

		this.update(dt);
		this.lastTime = timestamp;
		lastFrame = requestFrame(this.updateLoop.bind(this));
	}

	/**
	 * Initialize a plugin by passing fatina object to it
	 *
	 * @export
	 * @param {IPlugin} newPlugin
	 */
	public loadPlugin(newPlugin: IPlugin) {
		newPlugin.init(this);
		this.loadedPlugins.push(newPlugin);
		this.info(Log.Debug, 'Plugin Loaded', newPlugin.name);
	}

	private info(level: Log, message: string, data?: any) {
		if (level > this.settings.logLevel) {
			return;
		}
		if (data) {
			console.log(message, data);
		} else {
			console.log(message);
		}
	}

	private emit(func: any, control: IControl) {
		if (!this.settings.safe) {
			return func(control);
		}

		try {
			func(control);
		} catch (e) {
			console.warn(e);
		}
	}

	private emitCreated(control: IControl) {
		for (const event of this.eventCreated) {
			this.emit(event, control);
		}
	}

	/**
	 * Add a listener method on tween/sequence creation
	 *
	 * @export
	 * @param {(control: IControl) => void} cb
	 */
	public addListenerCreated(cb: (control: IControl) => void): void {
		this.eventCreated.push(cb);
	}

	/**
	 * Remove a listener method on tween/sequence creation
	 *
	 * @export
	 * @param {(control: IControl) => void} cb
	 */
	public removeListenerCreated(cb: (control: IControl) => void): void {
		const index = this.eventCreated.indexOf(cb);
		if (index !== -1) {
			this.eventCreated.splice(index, 1);
		}
	}

	/**
	 * This method is used to change the log level
	 *
	 * @export
	 * @param {Log} level
	 */
	public setLog(level: Log) {
		this.settings.logLevel = level;
	}

	/**
	 * This method is used to enable / disable the callback try/catch
	 *
	 * @export
	 * @param {boolean} isSafe
	 */
	public setSafe(isSafe: boolean) {
		this.settings.safe = isSafe;
	}
}
