import { IPlayable } from '../core/interfaces/IPlayable';
import { BaseTween } from './baseTween';

/**
 * Fake tween used to append or join callback in a sequence
 *
 * @export
 * @class Callback
 * @extends {BaseTween}
 * @implements {IPlayable}
 */
export class Callback extends BaseTween<Callback> implements IPlayable {
	/**
	 * @private
	 */
	private readonly callback: () => void;

	/**
	 * Creates an instance of Callback.
	 *
	 * @constructor
	 * @param {() => void} cb
	 */
	constructor(cb: () => void) {
		super();
		this.callback = cb;
		this.tickCb = this.tick.bind(this);
	}
	/**
	 * @private
	 * @param {number} dt
	 */
	private tick(dt: number) {
		this.elapsed += dt;
		this.duration = 0;
		this.callback();
		this.emitEvent(this.events.update, [dt, 1]);
		this.complete();
	}
}
