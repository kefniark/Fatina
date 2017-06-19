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
export class Delay extends BaseTween<Delay> implements IPlayable {
	private remainsDt: number;

	constructor(duration: number) {
		super();
		this.duration = duration;
		this.tickCb = this.Tick.bind(this);
	}

	private Tick(dt: number) {
		this.remainsDt = dt * this.timescale;

		while (this.remainsDt > 0) {
			this.elapsed += this.remainsDt;
			let progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
			this.EmitEvent(this.eventUpdate, [this.remainsDt, progress]);

			if (this.elapsed < this.duration) {
				return;
			}

			this.remainsDt = this.elapsed - this.duration;
			this.loop--;
			if (this.loop === 0) {
				this.Complete();
				return;
			}

			this.ResetAndStart(0);
		}
	}
}
