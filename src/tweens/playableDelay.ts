import { BaseTween } from './baseTween';
import { ITweenPlayable } from '../core/interfaces/ITweenPlayable';

export class PlayableDelay extends BaseTween implements ITweenPlayable {

	constructor(duration: number) {
		super();
		this.duration = duration;
		this.tickCallback = (dt: number) => {
			this.elapsed += dt;

			let progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
			super.Updated(dt, progress);

			if (this.elapsed >= this.duration) {
				this.Complete();
			}
		};
	}

	protected Validate() {}
}
