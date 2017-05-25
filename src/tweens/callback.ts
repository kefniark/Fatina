import { BaseTween } from './baseTween';
import { IPlayable } from '../core/interfaces/IPlayable';

export class Callback extends BaseTween implements IPlayable {
	constructor(cb: () => void) {
		super();
		this.tickCb = (dt: number) => {
			this.elapsed += dt;
			this.duration = 0;

			cb();

			this.Updated(dt, 1);
			this.Complete();
		};
	}

	protected Validate() {}
	protected LoopInit() {
		this.elapsed = 0;
	}
}
