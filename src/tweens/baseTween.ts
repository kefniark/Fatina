import { ITicker } from '../core/interfaces/ITicker';
import { TweenState } from '../core/enum/tweenState';

export abstract class BaseTween {
	public elapsed = 0;
	public duration = 0;

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

	protected abstract Validate(): void;

	public SetParent(ticker: ITicker): void {
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCallback);
		}
		this.parent = ticker;
	}

	public IsCompleted(): boolean {
		return this.state === TweenState.Finished;
	}

	public Start(): void {
		this.Validate();
		this.state = TweenState.Running;
		this.parent.AddTickListener(this.tickCallback);
		this.Started();
	}

	public Pause(): void {
		this.state = TweenState.Paused;
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCallback);
		}
	}

	public Resume(): void {
		this.state = TweenState.Running;
		this.parent.AddTickListener(this.tickCallback);
	}

	public Kill(): void {
		if (this.parent) {
			this.parent.RemoveTickListener(this.tickCallback);
		}
		this.state = TweenState.Finished
		this.Killed();
	}

	protected Complete(): void {
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
