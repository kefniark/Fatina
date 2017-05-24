import { BaseTween } from './baseTween';
import { ITweenPlayable } from '../core/interfaces/ITweenPlayable';

export class PlayableCallback extends BaseTween implements ITweenPlayable {

	constructor(cb: () => void) {
		super();

		this.tickCallback = (dt: number) => {
			this.elapsed += dt;
			this.duration = 0;

			cb();

			this.Updated(dt, 1);
			this.Complete();
		};
	}

	protected Validate() {}
}
