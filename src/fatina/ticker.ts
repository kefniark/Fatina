import { State } from './core/enum/state';
import { ITicker } from './core/interfaces/ITicker';

/**
 * Main Fatina Ticker
 * Parent of all the normal tween and sequence
 *
 * @export
 * @class Ticker
 * @extends {EventList}
 * @implements {ITicker}
 */
export class Ticker implements ITicker {
	public state = State.Idle;
	private timescale = 1;
	public elapsed = 0;
	public duration = 0;
	private update = 0;
	public tick: (dt: number) => void | undefined;
	private ticks: Set<(dt: number) => void> = new Set();
	private parent: ITicker;

	public SetParent(parent: ITicker, tick: (dt: number) => void) {
		this.tick = tick;
		this.parent = parent;
	}

	/**
	 * Method used to change the timescale
	 *
	 * @param {number} scale
	 *
	 * @memberOf Ticker
	 */
	public SetTimescale(scale: number): void {
		this.timescale = scale;
	}

	/**
	 * Method used by the child to be updated
	 *
	 * @param {(dt: number) => void} cb
	 *
	 * @memberOf Ticker
	 */
	public AddTickListener(cb: (dt: number) => void): void {
		this.ticks.add(cb);
	}

	/**
	 * Method used by the child to not receive update anymore
	 *
	 * @param {(dt: number) => void} cb
	 *
	 * @memberOf Ticker
	 */
	public RemoveTickListener(cb: (dt: number) => void): void {
		this.ticks.delete(cb);
	}

	/**
	 * Method used to tick all the child (tick listeners)
	 *
	 * @param {number} dt
	 * @returns
	 *
	 * @memberOf Ticker
	 */
	public Tick(dt: number) {
		if (this.state !== State.Run) {
			return;
		}

		const localDt = dt * this.timescale;
		for (const tick of this.ticks) {
			tick(localDt);
		}
		this.elapsed += localDt;
		this.update++;
	}

	public Start(): void {
		if (this.state === State.Idle) {
			this.state = State.Run;
		}
	}

	public Pause(): void {
		if (this.state === State.Run) {
			this.state = State.Pause;
		}
	}

	public Resume(): void {
		if (this.state === State.Pause) {
			this.state = State.Run;
		}
	}

	public Kill(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			return;
		}

		if (this.parent && this.tick) {
			this.parent.RemoveTickListener(this.tick);
		}

		this.state = State.Killed;
	}

	public Skip(): void {
		throw new Error('The main ticker cannot be skipped');
	}

	public Reset(): void {
		this.state = State.Idle;
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
}
