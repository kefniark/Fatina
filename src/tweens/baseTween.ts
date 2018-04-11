import { Log } from '../core/enum/log';
import { State } from '../core/enum/state';
import { ISettings } from '../core/interfaces/ISettings';
import { ITicker } from '../core/interfaces/ITicker';
import { ITweenProperty } from '../core/interfaces/ITweenProperty';

/**
 * Shared behaviors between different types of tweens and sequence
 * Used mostly to manage:
 *  - events
 *  - state
 *  - loop and restart
 *
 * @export
 * @abstract
 * @class BaseTween
 */
export abstract class BaseTween<T extends BaseTween<any>> {
	// events
	protected events: { [id: string]: any[] } = {};

	// public properties
	public elapsed = 0;
	public duration = 0;
	public timescale = 1;
	public state: State = State.Idle;

	// private properties
	protected loop: ITweenProperty | undefined;
	protected yo: ITweenProperty | undefined;
	protected parent: ITicker;
	protected tickCb: (dt: number) => void;
	private first = true;
	private settings?: ISettings;

	public get isIdle(): boolean {
		return this.state === State.Idle;
	}

	public get isRunning(): boolean {
		return this.state === State.Run;
	}

	public get isFinished(): boolean {
		return this.state >= 3;
	}

	public get isPaused(): boolean {
		return this. state === State.Pause;
	}

	/**
	 * Method used to start a tween
	 *
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public start(): T {
		if (this.state !== State.Idle) {
			return this as any;
		}

		if (this.first) {
			this.validate();
		} else {
			this.check();
		}

		this.state = State.Run;
		this.parent.addTick(this.tickCb);

		if (this.first) {
			this.emitEvent(this.events.start);
			this.first = false;
		}
		return this as any;
	}

	/**
	 * Reset a tween to be reusable (with start)
	 *
	 * @memberOf BaseTween
	 */
	public recycle() {
		this.reset(true);
		this.events = {};
		this.first = true;
	}

	/**
	 * To Reset a Tween already finished (example looping sequence)
	 *
	 * @memberOf BaseTween
	 */
	public reset(skipParent?: boolean): void {
		this.state = State.Idle;

		if (!skipParent) {
			this.removeParent();
		}

		if (this.loop) {
			this.loop.value = this.loop.original;
		}
		this.loopInit();
		this.emitEvent(this.events.restart);
	}

	/**
	 * To immediately Reset a tween without stopping/restarting it
	 * This is faster than calling manually Reset() & Start() & Tick()
	 *
	 * @param {number} dtRemains
	 *
	 * @memberOf BaseTween
	 */
	public resetAndStart(dtRemains: number) {
		this.loopInit();
		this.emitEvent(this.events.restart);

		this.state = State.Run;
		if (dtRemains > 0) {
			this.tickCb(dtRemains);
		}
	}

	/**
	 * Method used to define the ticker of this tween
	 * When Fatina.Tween is used, the main ticker is automatically defined as parent
	 *
	 * @param {ITicker} ticker
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public setParent(ticker: ITicker): T {
		this.removeParent();
		this.parent = ticker;
		return this as any;
	}

	/**
	 * Method used to change the timescale of the tween
	 *
	 * @param {number} scale
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public setTimescale(scale: number): T {
		this.timescale = scale;
		return this as any;
	}

	/**
	 * Method used to pause a tween or a sequence (only work if the tween runs)
	 *
	 * @returns {void}
	 *
	 * @memberOf BaseTween
	 */
	public pause(): void {
		if (this.state !== State.Run) {
			this.info(Log.Info, 'Cannot pause this tween ', this.state);
			return;
		}

		this.state = State.Pause;
		this.removeParent();
	}

	/**
	 * Method used to resume a tween or a sequence (only work if the tween is paused)
	 *
	 * @returns {void}
	 *
	 * @memberOf BaseTween
	 */
	public resume(): void {
		if (this.state !== State.Pause) {
			this.info(Log.Info, 'Cannot resume this tween ', this.state);
			return;
		}

		this.state = State.Run;
		this.parent.addTick(this.tickCb);
	}

	/**
	 * Method used to Skip this tween or sequence and directly finish it
	 *
	 * @param {boolean} [finalValue]
	 * @returns {void}
	 * @memberOf BaseTween
	 */
	public skip(finalValue?: boolean): void {
		if (this.state >= 3) {
			this.info(Log.Info, 'Cannot skip this tween ', this.state);
			return;
		}

		if (this.state === State.Idle) {
			this.emitEvent(this.events.start);
		}

		if (finalValue) {
			const duration = this.yo ? (this.yo.value * this.duration) : 0;
			this.tickCb(this.duration - this.elapsed + duration);
			return;
		}

		this.elapsed = this.duration;
		this.complete();
	}

	/**
	 * Method used to Stop/Kill a tween or a sequence
	 *
	 * @returns {void}
	 *
	 * @memberOf BaseTween
	 */
	public kill(): void {
		if (this.state === State.Killed) {
			this.info(Log.Info, 'Cannot kill this tween ', this.state);
			return;
		}

		this.state = State.Killed;
		this.removeParent();
		this.emitEvent(this.events.kill);
	}

	/**
	 * Method used to define how many time the tween has to loop
	 * Extra: if -1 the tween will loop forever
	 *
	 * @param {number} loop
	 * @returns {ITween}
	 *
	 * @memberOf Tween
	 */
	public setLoop(loop: number): T {
		if (!this.loop) {
			this.loop = { original: 1, value: 1 };
		}
		this.loop.original = Math.round(loop);
		this.loop.value = this.loop.original;
		return this as any;
	}

	public setSettings(settings: ISettings): T {
		if (this.settings) {
			Object.assign(this.settings, settings);
		} else {
			this.settings = settings;
		}
		return this as any;
	}

	protected complete(): void {
		if (this.state >= 3) {
			this.info(Log.Info, 'Cannot complete this tween ', this.state);
			return;
		}

		this.state = State.Finished;
		this.removeParent();
		this.emitEvent(this.events.complete);

		if (this.parent && (this.parent as any).cur) {
			return;
		}
		if (this.state >= 3) {
			this.final();
		}
	}

	protected final(): void {
		this.emitEvent(this.events.finally);
	}

	protected removeParent() {
		if (this.parent) {
			this.parent.removeTick(this.tickCb);
		}
	}

	protected check(): void {}
	protected validate(): void {}
	protected loopInit(): void {
		this.elapsed = 0;
	}

	protected info(level: Log, message: string, data?: any) {
		if (!this.settings || level > this.settings.logLevel) {
			return;
		}
		console.log(message, data);
	}

	private emit(func: any, args: any) {
		if (this.settings && !this.settings.safe) {
			return func.apply(this, args);
		}
		try {
			func.apply(this, args);
		} catch (e) {
			console.warn(e);
		}
	}

	protected emitEvent(listeners: any, args?: any) {
		if (!listeners) {
			return;
		}

		for (const listener of listeners) {
			this.emit(listener, args);
		}
	}

	/**
	 *  Callback called when the tween started
	 *
	 * @param {() => void} cb
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public onStart(cb: () => void): T {
		return this.onEvent('start', cb);
	}

	/**
	 * Callback called when the tween restart (loop)
	 *
	 * @param {() => void} cb
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public onRestart(cb: () => void): T {
		return this.onEvent('restart', cb);
	}

	/**
	 * Callback called when the tween is updated
	 *
	 * @param {(dt: number, progress: number) => void} cb
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public onUpdate(cb: (dt: number, progress: number) => void): T {
		return this.onEvent('update', cb);
	}

	/**
	 * Callback called when the tween is manually killed
	 *
	 * @param {() => void} cb
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public onKilled(cb: () => void): T {
		return this.onEvent('kill', cb);
	}

	/**
	 * Callback called when the tween is finished
	 *
	 * @param {() => void} cb
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public onComplete(cb: () => void): T {
		return this.onEvent('complete', cb);
	}

	public onFinally(cb: () => void): T {
		return this.onEvent('finally', cb);
	}

	protected onEvent(name: string, cb: any): T {
		if (!this.events[name]) {
			this.events[name] = [cb];
		} else {
			this.events[name].push(cb);
		}
		return this as any;
	}
}
