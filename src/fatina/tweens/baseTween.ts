import { ITicker } from '../core/interfaces/ITicker';
import { State } from '../core/enum/state';
import { TweenType } from '../core/enum/tweenType';

export abstract class BaseTween {
	public elapsed = 0;
	public duration = 0;
	public timescale = 1;
	protected loop = 1;

	protected parent: ITicker;
	protected tickCb: (dt: number) => void;
	protected state: State = State.Idle;

	private eventStart: {(): void}[] = [];
	private eventUpdate: {(dt: number, progress: number): void}[] = [];
	private eventKill: {(): void}[] = [];
	private eventComplete: {(): void}[] = [];
	private firstStart = true;

	protected abstract Validate(): void;
	protected abstract LoopInit(): void;

	public abstract get Type(): TweenType;

	public get Elapsed() {
		return this.elapsed;
	}
	public get Duration() {
		return this.duration;
	}

	public SetParent(ticker: ITicker): void {
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}
		this.parent = ticker;
	}

	public get IsRunning(): boolean {
		return this.state === State.Run;
	}

	public get IsCompleted(): boolean {
		return this.state === State.Finished;
	}

	public get IsKilled(): boolean {
		return this.state === State.Killed;
	}

	public Start(): void {
		if (this.state !== State.Idle) {
			console.warn('cant start this tween, already in state', this.state);
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
			this.Started();
			this.firstStart = false;
		}
	}

	public Reset(resetloop?: boolean): void {
		this.state = State.Idle;

		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}

		if (resetloop === true) {
			this.loop = 1;
		}

		this.LoopInit();
	}

	public ResetAndStart(resetloop: boolean, dtRemains: number) {
		if (resetloop === true) {
			this.loop = 1;
		}

		this.LoopInit();

		this.state = State.Run;
		if (dtRemains > 0) {
			this.tickCb(dtRemains);
		}
	}

	public Skip(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			console.warn('cant skip this tween, already in state', this.state);
			return;
		}

		if (this.state === State.Idle) {
			this.Started();
		}

		this.elapsed = this.duration;
		this.Complete();
	}

	public Pause(): void {
		if (this.state !== State.Run) {
			console.warn('cant pause this tween, already in state', this.state);
			return;
		}

		this.state = State.Pause;
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}
	}

	public Resume(): void {
		if (this.state !== State.Pause) {
			console.warn('cant resume this tween, already in state', this.state);
			return;
		}

		this.state = State.Run;
		this.parent.AddTickListener(this.tickCb);
	}

	public Kill(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			console.warn('cant kill this tween, already in state', this.state);
			return;
		}

		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}

		this.state = State.Killed
		this.Killed();
		this.Cleanup();
	}

	protected CheckPosition(): void {}

	protected abstract Cleanup(): void;

	public Default() {
		this.elapsed = 0;
		this.duration = 0;
		this.timescale = 1;
		this.loop = 1;
		this.eventStart.length = 0;
		this.eventUpdate.length = 0;
		this.eventKill.length = 0;
		this.eventComplete.length = 0;
		this.firstStart = true;
		this.state = State.Idle;
		delete this.parent;
	}

	protected Complete(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			console.warn('cant complete this tween, already in state', this.state);
			return;
		}

		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}

		this.state = State.Finished;
		this.Completed();
		this.Cleanup();
	}

	protected Started() {
		for (let i = 0; i < this.eventStart.length; i++) {
			try {
				this.eventStart[i]();
			} catch (e) {
				console.warn(e);
			}
		}
		this.eventStart.length = 0;
	}

	protected Updated(dt: number, progress: number) {
		for (let i = 0; i < this.eventUpdate.length; i++) {
			try {
				this.eventUpdate[i](dt, progress);
			} catch (e) {
				console.warn(e);
			}
		}
	}

	protected Killed() {
		for (let i = 0; i < this.eventKill.length; i++) {
			try {
				this.eventKill[i]();
			} catch (e) {
				console.warn(e);
			}
		}
		this.eventKill.length = 0;
	}

	protected Completed() {
		for (let i = 0; i < this.eventComplete.length; i++) {
			try {
				this.eventComplete[i]();
			} catch (e) {
				console.warn(e);
			}
		}
		this.eventComplete.length = 0;
	}

	public OnStart(cb: () => void): void {
		this.eventStart[this.eventStart.length] = cb;
	}

	public OnUpdate(cb: (dt: number, progress: number) => void): void {
		this.eventUpdate[this.eventUpdate.length] = cb;
	}

	public OnKilled(cb: () => void): void {
		this.eventKill[this.eventKill.length] = cb;
	}

	public OnComplete(cb: () => void): void {
		this.eventComplete[this.eventComplete.length] = cb;
	}
}
