import { ITicker } from '../core/interfaces/ITicker';
import { TweenState } from '../core/enum/tweenState';

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
	protected tickCallback: (dt: number) => void;
	protected state: TweenState = TweenState.Idle;

	private listenerStarted: {(): void}[] = [];
	private listenerUpdated: {(dt: number, progress: number): void}[] = [];
	private listenerKilled: {(): void}[] = [];
	private listenerCompleted: {(): void}[] = [];
	private firstStart = true;

	protected abstract Validate(): void;
	protected abstract LoopInit(): void;

	public SetParent(ticker: ITicker): void {
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCallback);
		}
		this.parent = ticker;
	}

	public IsRunning(): boolean {
		return this.state === TweenState.Running;
	}

	public IsCompleted(): boolean {
		return this.state === TweenState.Finished;
	}

	public IsKilled(): boolean {
		return this.state === TweenState.Killed;
	}

	public Start(): void {
		if (this.state !== TweenState.Idle) {
			console.warn('cant start this tween, already in state', this.state);
			return;
		}

		if (this.firstStart) {
			this.Validate();
		}

		this.state = TweenState.Running;
		this.parent.AddTickListener(this.tickCallback);

		if (this.firstStart) {
			this.Started();
			this.firstStart = false;
		}
	}

	public Reset(resetloop?: boolean): void {
		this.state = TweenState.Idle;

		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCallback);
		}

		if (resetloop === true) {
			this.loop = 1;
		}

		this.LoopInit();
	}

	public Pause(): void {
		if (this.state !== TweenState.Running) {
			console.warn('cant pause this tween, already in state', this.state);
			return;
		}

		this.state = TweenState.Paused;
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCallback);
		}
	}

	public Resume(): void {
		if (this.state !== TweenState.Paused) {
			console.warn('cant resume this tween, already in state', this.state);
			return;
		}

		this.state = TweenState.Running;
		this.parent.AddTickListener(this.tickCallback);
	}

	public Kill(): void {
		if (this.state === TweenState.Killed || this.state === TweenState.Finished) {
			console.warn('cant kill this tween, already in state', this.state);
			return;
		}

		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCallback);
		}
		this.state = TweenState.Killed
		this.Killed();
	}

	protected Complete(): void {
		if (this.state === TweenState.Killed || this.state === TweenState.Finished) {
			console.warn('cant complete this tween, already in state', this.state);
			return;
		}

		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCallback);
		}
		this.state = TweenState.Finished;
		this.Completed();
	}

	protected Started() {
		for (let i = 0; i < this.listenerStarted.length; i++) {
			this.listenerStarted[i]();
		}
		this.listenerStarted = [];
	}

	protected Updated(dt: number, progress: number) {
		for (let i = 0; i < this.listenerUpdated.length; i++) {
			this.listenerUpdated[i](dt, progress);
		}
	}

	protected Killed() {
		for (let i = 0; i < this.listenerKilled.length; i++) {
			this.listenerKilled[i]();
		}
		this.listenerKilled = [];
	}

	protected Completed() {
		for (let i = 0; i < this.listenerCompleted.length; i++) {
			this.listenerCompleted[i]();
		}
		this.listenerCompleted = [];
	}

	public OnStart(cb: () => void): void {
		this.listenerStarted.push(cb);
	}

	public OnUpdate(cb: (dt: number, progress: number) => void): void {
		this.listenerUpdated.push(cb);
	}

	public OnKilled(cb: () => void): void {
		this.listenerKilled.push(cb);
	}

	public OnComplete(cb: () => void): void {
		this.listenerCompleted.push(cb);
	}
}
