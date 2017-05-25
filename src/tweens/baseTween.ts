import { ITicker } from '../core/interfaces/ITicker';
import { State } from '../core/enum/tweenState';

export abstract class BaseTween {
	public elapsed = 0;
	public duration = 0;
	public timescale = 1;
	protected loop = 1;

	public get Elapsed() {
		return this.elapsed;
	}
	public get Duration() {
		return this.duration;
	}

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

	public SetParent(ticker: ITicker): void {
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCb);
		}
		this.parent = ticker;
	}

	public IsRunning(): boolean {
		return this.state === State.Run;
	}

	public IsCompleted(): boolean {
		return this.state === State.Finished;
	}

	public IsKilled(): boolean {
		return this.state === State.Killed;
	}

	public Start(): void {
		if (this.state !== State.Idle) {
			console.warn('cant start this tween, already in state', this.state);
			return;
		}

		if (this.firstStart) {
			this.Validate();
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
	}

	protected Started() {
		for (let i = 0; i < this.eventStart.length; i++) {
			this.eventStart[i]();
		}
		this.eventStart = [];
	}

	protected Updated(dt: number, progress: number) {
		for (let i = 0; i < this.eventUpdate.length; i++) {
			this.eventUpdate[i](dt, progress);
		}
	}

	protected Killed() {
		for (let i = 0; i < this.eventKill.length; i++) {
			this.eventKill[i]();
		}
		this.eventKill = [];
	}

	protected Completed() {
		for (let i = 0; i < this.eventComplete.length; i++) {
			this.eventComplete[i]();
		}
		this.eventComplete = [];
	}

	public OnStart(cb: () => void): void {
		this.eventStart.push(cb);
	}

	public OnUpdate(cb: (dt: number, progress: number) => void): void {
		this.eventUpdate.push(cb);
	}

	public OnKilled(cb: () => void): void {
		this.eventKill.push(cb);
	}

	public OnComplete(cb: () => void): void {
		this.eventComplete.push(cb);
	}
}
