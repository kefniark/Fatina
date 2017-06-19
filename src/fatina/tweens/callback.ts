import { BaseTween } from './baseTween';
import { IPlayable } from '../core/interfaces/IPlayable';

/**
 * Fake tween used to append or join callback in a sequence
 *
 * @export
 * @class Callback
 * @extends {BaseTween}
 * @implements {IPlayable}
 */
export class Callback extends BaseTween<Callback> implements IPlayable {
	private callback: () => void;

	constructor(cb: () => void) {
		super();
		this.callback = cb;
		this.tickCb = this.Tick.bind(this);
	}

	private Tick(dt: number) {
		this.elapsed += dt;
		this.duration = 0;
		this.callback();
		this.EmitEvent(this.eventUpdate, [dt, 1]);
		this.Complete();
	}
}
