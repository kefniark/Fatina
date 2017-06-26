import { State } from './core/enum/state';
import { EventList } from './core/eventList';
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
export class Ticker extends EventList implements ITicker {
	public state = State.Idle;
	private timescale = 1;
	public elapsed = 0;
	public duration = 0;
	private update = 0;
	private eventToAdd: { (dt: number): void }[] = [];
	private eventToRemove: { (dt: number): void }[] = [];
	public tick: (dt: number) => void | undefined;
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
		this.eventToAdd.push(cb);
	}

	/**
	 * Method used by the child to not receive update anymore
	 *
	 * @param {(dt: number) => void} cb
	 *
	 * @memberOf Ticker
	 */
	public RemoveTickListener(cb: (dt: number) => void): void {
		this.eventToRemove.push(cb);
	}

	/**
	 * Internal method used to cancel a stop (restart in the same frame)
	 *
	 * @param {(dt: number) => void} cb
	 *
	 * @memberOf Ticker
	 */
	public CheckTickListener(cb: (dt: number) => void): boolean {
		let found = false;
		while (true) {
			const index = this.eventToRemove.indexOf(cb);
			if (index === -1) {
				return found;
			}
			this.eventToRemove.splice(index, 1);
			found = true;
		}
	}

	/**
	 * Method used to update the array of listener
	 * This is mostly for performance reason, being able to batch this operation in the updateLoop
	 *
	 * @private
	 *
	 * @memberOf Ticker
	 */
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

		this.UpdateListener();

		const localDt = dt * this.timescale;
		for (let tick: any = this.first; tick; tick = tick.node_next) {
			tick(localDt);
		}
		this.elapsed += localDt;
		this.update++;

		this.UpdateListener();
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
