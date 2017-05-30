import { ITicker } from './core/interfaces/ITicker';
import { State } from './core/enum/state';
import { TweenType } from './core/enum/tweenType';
import { ITween } from './core/interfaces/ITween';
import { ISequence } from './core/interfaces/ISequence';
import { EventList } from './core/eventList';

export class Ticker extends EventList implements ITicker {
	public get Type() {
		return TweenType.Ticker;
	}

	private state = State.Idle;
	private timescale = 1;
	private elapsed = 0;
	private eventToAdd: { (dt: number): void }[] = [];
	private eventToRemove: { (dt: number): void }[] = [];
	private cleanUpdate = 0;
	private cleanTweens1: (ITween | ISequence)[] = [];
	private cleanTweens2: (ITween | ISequence)[] = [];

	public GetCleanTweens(): (ITween | ISequence)[] {
		if (this.cleanUpdate % 2 === 0) {
			this.cleanTweens2.length = 0;
			return this.cleanTweens1;
		} else {
			this.cleanTweens1.length = 0;
			return this.cleanTweens2;
		}
	}

	public SetTimescale(scale: number): void {
		this.timescale = scale;
	}

	public get Elapsed(): number {
		return this.elapsed;
	}

	public get Duration(): number {
		return 0;
	}

	public AddTickListener(cb: (dt: number) => void): void {
		this.eventToAdd.push(cb);
	}

	public RemoveTickListener(cb: (dt: number) => void): void {
		this.eventToRemove.push(cb);
	}

	private UpdateListener() {
		if (this.eventToAdd.length > 0) {
			for (let i = 0; i < this.eventToAdd.length; i++) {
				this.Add(this.eventToAdd[i]);
			}
			this.eventToAdd = [];
		}

		if (this.eventToRemove.length > 0) {
			for (let i = 0; i < this.eventToRemove.length; i++) {
				this.Remove(this.eventToRemove[i]);
			}
			this.eventToRemove = [];
		}
	}

	public Tick(dt: number) {
		if (this.state !== State.Run) {
			return;
		}

		this.UpdateListener();

		let localDt = dt * this.timescale;
		for (let tick: any = this.first; tick; tick = tick.node_next) {
			tick(localDt);
		}
		this.elapsed += localDt;
		this.cleanUpdate += 1;

		this.UpdateListener();
	}

	public IsCompleted(): boolean {
		return this.state === State.Finished;
	}

	public IsRunning(): boolean {
		return this.state === State.Run;
	}

	public IsKilled(): boolean {
		return this.state === State.Killed;
	}

	public Start(): void {
		if (this.state !== State.Idle) {
			return;
		}
		this.state = State.Run;
	}

	public Pause(): void {
		if (this.state !== State.Run) {
			return;
		}
		this.state = State.Pause;
	}

	public Resume(): void {
		if (this.state !== State.Pause) {
			return;
		}
		this.state = State.Run;
	}

	public Kill(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			return;
		}
		this.state = State.Killed;
	}

	public Reset(): void {
		this.state = State.Idle;
	}

	public Clean(data: (ITween | ISequence)[]): void {
		for (let i = 0; i < data.length; i++) {
			let obj = data[i];
			if (this.cleanUpdate % 2 === 0) {
				this.cleanTweens2.push(obj);
			} else {
				this.cleanTweens1.push(obj);
			}
		}
	}
}
