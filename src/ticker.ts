import { ITicker } from './core/interfaces/ITicker';
import { State } from './core/enum/tweenState';

export class Ticker implements ITicker {
	private state = State.Idle;
	private timescale = 1;
	private elapsed = 0;
	private eventTick: { (dt: number): void }[] = [];

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

	IsCompleted(): boolean {
		return this.state === State.Finished;
	}

	IsRunning(): boolean {
		return this.state === State.Run;
	}

	IsKilled(): boolean {
		return this.state === State.Killed;
	}

	Start(): void {
		if (this.state !== State.Idle) {
			return;
		}
		this.state = State.Run;
	}

	Pause(): void {
		if (this.state !== State.Run) {
			return;
		}
		this.state = State.Pause;
	}

	Resume(): void {
		if (this.state !== State.Pause) {
			return;
		}
		this.state = State.Run;
	}

	Kill(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			return;
		}
		this.state = State.Killed;
	}

	Reset(): void {
		this.state = State.Idle;
	}
}
