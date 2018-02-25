import { Log } from '../core/enum/log';
import { State } from '../core/enum/state';
import { ITicker } from '../core/interfaces/ITicker';
import { ISettings } from '../core/interfaces/ISettings';
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
export abstract class BaseTween<T extends BaseTween<any>>  {
	// events
	protected eventStart: {(): void}[] | undefined;
	protected eventRestart: {(): void}[] | undefined;
	protected eventUpdate: {(dt: number, progress: number): void}[] | undefined;
	protected eventKill: {(): void}[] | undefined;
	protected eventComplete: {(): void}[] | undefined;

	// public properties
	public elapsed = 0;
	public duration = 0;
	public timescale = 1;
	public state: State = State.Idle;

	// private properties
	protected loop: ITweenProperty | undefined;
	protected yoyo: ITweenProperty | undefined;
	protected parent: ITicker;
	protected tickCb: (dt: number) => void;
	private firstStart = true;
	private settings?: ISettings;

	/**
	 * Method used to start a tween
	 *
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public Start(): T {
		if (this.state !== State.Idle) {
			return this as any;
		}

		if (this.firstStart) {
			this.Validate();
		} else {
			this.CheckPosition();
		}

		this.state = State.Run;
		this.parent.AddTickListener(this.tickCb);

		if (this.firstStart) {
			this.EmitEvent(this.eventStart);
			this.firstStart = false;
		}
		return this as any;
	}

	/**
	 * Reset a tween to be reusable (with start)
	 *
	 * @memberOf BaseTween
	 */
	public Recycle() {
		this.Reset(true);
		this.firstStart = true;
	}

	/**
	 * To Reset a Tween already finished (example looping sequence)
	 *
	 * @memberOf BaseTween
	 */
	public Reset(skipParent?: boolean): void {
		this.state = State.Idle;

		if (!skipParent) {
			this.RemoveParentListener();
		}

		if (this.loop) {
			this.loop.value = this.loop.original;
		}
		this.LoopInit();
		this.EmitEvent(this.eventRestart);
	}

	/**
	 * To immediately Reset a tween without stopping/restarting it
	 * This is faster than calling manually Reset() & Start() & Tick()
	 *
	 * @param {number} dtRemains
	 *
	 * @memberOf BaseTween
	 */
	public ResetAndStart(dtRemains: number) {
		this.LoopInit();
		this.EmitEvent(this.eventRestart);

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
	public SetParent(ticker: ITicker): T {
		this.RemoveParentListener();
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
	public SetTimescale(scale: number): T {
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
	public Pause(): void {
		if (this.state !== State.Run) {
			this.Info(Log.Info, 'Cannot pause this tween ', this.state);
			return;
		}

		this.state = State.Pause;
		this.RemoveParentListener();
	}

	/**
	 * Method used to resume a tween or a sequence (only work if the tween is paused)
	 *
	 * @returns {void}
	 *
	 * @memberOf BaseTween
	 */
	public Resume(): void {
		if (this.state !== State.Pause) {
			this.Info(Log.Info, 'Cannot resume this tween ', this.state);
			return;
		}

		this.state = State.Run;
		this.parent.AddTickListener(this.tickCb);
	}

	/**
	 * Method used to Skip this tween or sequence and directly finish it
	 *
	 * @param {boolean} [finalValue]
	 * @returns {void}
	 * @memberOf BaseTween
	 */
	public Skip(finalValue?: boolean): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			this.Info(Log.Info, 'Cannot skip this tween ', this.state);
			return;
		}

		if (this.state === State.Idle) {
			this.EmitEvent(this.eventStart);
		}

		if (finalValue) {
			const duration = this.yoyo ? (this.yoyo.value * this.duration) : 0;
			this.tickCb(this.duration - this.elapsed + duration);
			return;
		}

		this.elapsed = this.duration;
		this.Complete();
	}

	/**
	 * Method used to Stop/Kill a tween or a sequence
	 *
	 * @returns {void}
	 *
	 * @memberOf BaseTween
	 */
	public Kill(): void {
		if (this.state === State.Killed) {
			this.Info(Log.Info, 'Cannot kill this tween ', this.state);
			return;
		}

		this.state = State.Killed;
		this.RemoveParentListener();
		this.EmitEvent(this.eventKill);
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
	public SetLoop(loop: number): T {
		if (!this.loop) {
			this.loop = { original: 1, value: 1 };
		}
		this.loop.original = Math.round(loop);
		this.loop.value = this.loop.original;
		return this as any;
	}

	public SetSettings(settings: ISettings): T {
		this.settings = settings;
		return this as any;
	}

	public IsIdle(): boolean {
		return this.state === State.Idle;
	}

	public IsRunning(): boolean {
		return this.state === State.Run;
	}

	public IsFinished(): boolean {
		return this.state === State.Killed || this.state === State.Finished;
	}

	public IsPaused(): boolean {
		return this. state === State.Pause;
	}

	protected Complete(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			this.Info(Log.Info, 'Cannot complete this tween ', this.state);
			return;
		}

		this.state = State.Finished;
		this.RemoveParentListener();
		this.EmitEvent(this.eventComplete);
	}

	protected RemoveParentListener() {
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}
	}

	protected CheckPosition(): void {}
	protected Validate(): void {}
	protected LoopInit(): void {
		this.elapsed = 0;
	}

	protected Info(level: Log, message: string, data?: any) {
		if (!this.settings || level > this.settings.logLevel) {
			return;
		}
		if (data) {
			console.log(message, data);
		} else {
			console.log(message);
		}
	}

	private Emit(func: any, args: any) {
		if (this.settings && !this.settings.safe) {
			return func.apply(this, args);
		}
		try {
			func.apply(this, args);
		} catch (e) {
			console.warn(e);
		}
	}

	protected EmitEvent(listeners: any, args?: any) {
		if (!listeners) {
			return;
		}

		for (let i = 0; i < listeners.length; i++) {
			this.Emit(listeners[i], args);
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
	public OnStart(cb: () => void): T {
		if (!this.eventStart) {
			this.eventStart = new Array(0);
		}
		this.eventStart[this.eventStart.length] = cb;
		this.Info(Log.Debug, 'onStart');
		return this as any;
	}

	/**
	 * Callback called when the tween restart (loop)
	 *
	 * @param {() => void} cb
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public OnRestart(cb: () => void): T {
		if (!this.eventRestart) {
			this.eventRestart = new Array(0);
		}
		this.eventRestart[this.eventRestart.length] = cb;
		this.Info(Log.Debug, 'onRestart');
		return this as any;
	}

	/**
	 * Callback called when the tween is updated
	 *
	 * @param {(dt: number, progress: number) => void} cb
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public OnUpdate(cb: (dt: number, progress: number) => void): T {
		if (!this.eventUpdate) {
			this.eventUpdate = new Array(0);
		}
		this.eventUpdate[this.eventUpdate.length] = cb;
		return this as any;
	}

	/**
	 * Callback called when the tween is manually killed
	 *
	 * @param {() => void} cb
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public OnKilled(cb: () => void): T {
		if (!this.eventKill) {
			this.eventKill = new Array(0);
		}
		this.eventKill[this.eventKill.length] = cb;
		this.Info(Log.Debug, 'onKilled');
		return this as any;
	}

	/**
	 * Callback called when the tween is finished
	 *
	 * @param {() => void} cb
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public OnComplete(cb: () => void): T {
		if (!this.eventComplete) {
			this.eventComplete = new Array(0);
		}
		this.eventComplete[this.eventComplete.length] = cb;
		this.Info(Log.Debug, 'onComplete');
		return this as any;
	}
}
