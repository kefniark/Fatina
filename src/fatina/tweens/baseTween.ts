import { ITicker } from '../core/interfaces/ITicker';
import { State } from '../core/enum/state';

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
	public elapsed = 0;
	public duration = 0;
	public timescale = 1;
	protected loop = 1;
	protected parent: ITicker;
	protected tickCb: (dt: number) => void;
	public state: State = State.Idle;

	protected eventStart: {(): void}[] | undefined;
	protected eventRestart: {(): void}[] | undefined;
	protected eventUpdate: {(dt: number, progress: number): void}[] | undefined;
	protected eventKill: {(): void}[] | undefined;
	protected eventComplete: {(): void}[] | undefined;
	private firstStart = true;

	/**
	 * Method used to start a tween
	 *
	 * @returns {T}
	 *
	 * @memberOf BaseTween
	 */
	public Start(): T {
		if (this.state !== State.Idle) {
			console.warn('cant start this tween', this.state);
			return <any> this;
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
		return <any> this;
	}

	public Reset(): void {
		this.state = State.Idle;

		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}

		this.loop = 1;
		this.LoopInit();
		this.EmitEvent(this.eventRestart);
	}

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
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}
		this.parent = ticker;
		return <any> this;
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
		return <any> this;
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
			console.warn('cant pause this tween', this.state);
			return;
		}

		this.state = State.Pause;
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}
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
			console.warn('cant resume this tween', this.state);
			return;
		}

		this.state = State.Run;
		this.parent.AddTickListener(this.tickCb);
	}

	/**
	 * Method used to Skip this tween or sequence and directly finish it
	 *
	 * @returns {void}
	 *
	 * @memberOf BaseTween
	 */
	public Skip(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			console.warn('cant skip this tween', this.state);
			return;
		}

		if (this.state === State.Idle) {
			this.EmitEvent(this.eventStart);
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
			return;
		}

		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}

		this.state = State.Killed
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
		this.loop = Math.round(loop);
		return <any> this;
	}

	protected Complete(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			console.warn('cant complete this tween', this.state);
			return;
		}

		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}

		this.state = State.Finished;
		this.EmitEvent(this.eventComplete);
	}

	protected CheckPosition(): void {}
	protected Validate(): void {}
	protected LoopInit(): void {
		this.elapsed = 0;
	}

	public Default() {
		this.elapsed = 0;
		this.duration = 0;
		this.timescale = 1;
		this.loop = 1;
		this.firstStart = true;
		this.state = State.Idle;
	}

	private Emit(func: any, args: any) {
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
		return <any> this;
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
		return <any> this;
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
		return <any> this;
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
		return <any> this;
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
		return <any> this;
	}
}
