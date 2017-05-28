import { ITicker } from './core/interfaces/ITicker';
import { State } from './core/enum/state';
import { TweenType } from './core/enum/tweenType';
import { ITween } from './core/interfaces/ITween';
import { ISequence } from './core/interfaces/ISequence';

export class Ticker implements ITicker {
	public get Type() {
		return TweenType.Ticker;
	}

	private state = State.Idle;
	private timescale = 1;
	private elapsed = 0;
	private eventTick: { (dt: number): void }[] = [];
	private cleanTweens: (ITween | ISequence)[] = [];

	public GetCleanTweens(): (ITween | ISequence)[] {
		let val = this.cleanTweens;
		this.cleanTweens = [];
		return val;
	}

	public get Elapsed(): number {
		return this.elapsed;
	}

	public get Duration(): number {
		return 0;
	}

	public AddTickListener(cb: (dt: number) => void): void {
		this.eventTick.unshift(cb);
	}

	public RemoveTickListener(cb: (dt: number) => void): void {
		let index = this.eventTick.indexOf(cb);
		if (index !== -1) {
			this.eventTick.splice(index, 1);
		}
	}

	public Tick(dt: number) {
		if (this.state !== State.Run) {
			return;
		}

		let localDt = dt * this.timescale;
		for (let i = this.eventTick.length - 1; i >= 0; i--) {
			this.eventTick[i](localDt);
		}
		this.elapsed += localDt;
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
		for (let obj of data) {
			this.cleanTweens.push(obj);
		}
	}
}
