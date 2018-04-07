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
	private tickCb: (dt: number) => void | undefined;
	private readonly ticks: Set<(dt: number) => void> = new Set();
	private parent: ITicker;

	public setParent(parent: ITicker, tick: (dt: number) => void) {
		this.tickCb = tick;
		this.parent = parent;
	}

	/**
	 * Method used to change the timescale
	 *
	 * @param {number} scale
	 *
	 * @memberOf Ticker
	 */
	public setTimescale(scale: number): void {
		this.timescale = scale;
	}

	/**
	 * Method used by the child to be updated
	 *
	 * @param {(dt: number) => void} cb
	 *
	 * @memberOf Ticker
	 */
	public addTick(cb: (dt: number) => void): void {
		this.ticks.add(cb);
	}

	/**
	 * Method used by the child to not receive update anymore
	 *
	 * @param {(dt: number) => void} cb
	 *
	 * @memberOf Ticker
	 */
	public removeTick(cb: (dt: number) => void): void {
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
	public tick(dt: number) {
		if (this.state !== State.Run) {
			return;
		}

		const localDt = dt * this.timescale;
		for (const tick of this.ticks) {
			tick(localDt);
		}
		this.elapsed += localDt;
	}

	public start(): void {
		if (this.state === State.Idle) {
			this.state = State.Run;
		}
	}

	public pause(): void {
		if (this.state === State.Run) {
			this.state = State.Pause;
		}
	}

	public resume(): void {
		if (this.state === State.Pause) {
			this.state = State.Run;
		}
	}

	public kill(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			return;
		}

		if (this.parent && this.tickCb) {
			this.parent.removeTick(this.tickCb);
		}

		this.state = State.Killed;
	}

	public skip(): void {
		throw new Error('main ticker cannot be skipped');
	}

	public reset(): void {
		this.state = State.Idle;
	}

	public get isIdle(): boolean {
		return this.state === State.Idle;
	}

	public get isRunning(): boolean {
		return this.state === State.Run;
	}

	public get isFinished(): boolean {
		return this.state === State.Killed || this.state === State.Finished;
	}

	public get isPaused(): boolean {
		return this. state === State.Pause;
	}
}
