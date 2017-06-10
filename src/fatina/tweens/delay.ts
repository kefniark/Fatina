import { BaseTween } from './baseTween';
import { IPlayable } from '../core/interfaces/IPlayable';

/**
 * Fake tween used to delay other tweens in a sequence
 *
 * @export
 * @class Delay
 * @extends {BaseTween}
 * @implements {IPlayable}
 */
export class Delay extends BaseTween implements IPlayable {
	constructor(duration: number) {
		super();
		this.duration = duration;
		this.tickCb = this.Tick.bind(this);
	}

	private Tick(dt: number) {
		this.elapsed += dt;
		let progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
		this.EmitEvent(this.eventUpdate, [dt, progress]);
		if (this.elapsed >= this.duration) {
			this.Complete();
		}
	}
}
