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
export abstract class BaseTween {
	public elapsed = 0;
	public duration = 0;
	public timescale = 1;
	protected loop = 1;
	protected parent: ITicker;
	protected tickCb: (dt: number) => void;
	public state: State = State.Idle;

	protected eventStart: {(): void}[] | undefined;
	protected eventUpdate: {(dt: number, progress: number): void}[] | undefined;
	protected eventKill: {(): void}[] | undefined;
	protected eventComplete: {(): void}[] | undefined;
	private firstStart = true;

	public Start(): void {
		if (this.state !== State.Idle) {
			console.warn('cant start this tween', this.state);
			return;
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
	}

	public Reset(): void {
		this.state = State.Idle;

		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}

		this.loop = 1;
		this.LoopInit();
	}

	public ResetAndStart(dtRemains: number) {
		this.LoopInit();

		this.state = State.Run;
		if (dtRemains > 0) {
			this.tickCb(dtRemains);
		}
	}

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

	public Resume(): void {
		if (this.state !== State.Pause) {
			console.warn('cant resume this tween', this.state);
			return;
		}

		this.state = State.Run;
		this.parent.AddTickListener(this.tickCb);
	}

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

	protected CheckPosition(): void {}
	protected Validate(): void {}
	protected LoopInit(): void {
		this.elapsed = 0;
	}

	public SetParent(ticker: ITicker): void {
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}
		this.parent = ticker;
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
}
