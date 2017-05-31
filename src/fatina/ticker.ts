import { ITicker } from './core/interfaces/ITicker';
import { State } from './core/enum/state';
import { TweenType } from './core/enum/tweenType';
import { ITween } from './core/interfaces/ITween';
import { ISequence } from './core/interfaces/ISequence';
import { EventList } from './core/eventList';

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
	public get Type() {
		return TweenType.Ticker;
	}

	private state = State.Idle;
	private timescale = 1;
	private elapsed = 0;
	private eventToAdd: { (dt: number): void }[] = [];
	private eventToRemove: { (dt: number): void }[] = [];
	private cleanUpdate = 0;
	private clean1: (ITween | ISequence)[] = [];
	private clean2: (ITween | ISequence)[] = [];

	public get Elapsed(): number {
		return this.elapsed;
	}

	public get Duration(): number {
		return 0;
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

		let localDt = dt * this.timescale;
		for (let tick: any = this.first; tick; tick = tick.node_next) {
			tick(localDt);
		}
		this.elapsed += localDt;
		this.cleanUpdate += 1;

		this.UpdateListener();
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

	public Skip(): void {
		throw new Error('The main ticker cannot be skipped');
	}

	public Reset(): void {
		this.state = State.Idle;
	}

	/**
	 * Method used to clean a list of old tween / sequence
	 * This is using 2 array to avoid allocating new one on each frames
	 *
	 * @param {((ITween | ISequence)[])} data
	 *
	 * @memberOf Ticker
	 */
	public Clean(data: (ITween | ISequence)[]): void {
		for (let i = 0; i < data.length; i++) {
			let obj = data[i];
			if (this.cleanUpdate % 2 === 0) {
				this.clean2.push(obj);
			} else {
				this.clean1.push(obj);
			}
		}
	}

	public GetCleanTweens(): (ITween | ISequence)[] {
		if (this.cleanUpdate % 2 === 0) {
			this.clean2.length = 0;
			return this.clean1;
		} else {
			this.clean1.length = 0;
			return this.clean2;
		}
	}
}
