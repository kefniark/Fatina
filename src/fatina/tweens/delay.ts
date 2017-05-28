import { BaseTween } from './baseTween';
import { IPlayable } from '../core/interfaces/IPlayable';
import { TweenType } from '../core/enum/tweenType';

export class Delay extends BaseTween implements IPlayable {
	public get Type() {
		return TweenType.Delay;
	}

	constructor(duration: number) {
		super();
		this.duration = duration;
		this.tickCb = (dt: number) => {
			this.elapsed += dt;

			let progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
			super.Updated(dt, progress);

			if (this.elapsed >= this.duration) {
				this.Complete();
			}
		};
	}

	protected Validate() {}
	protected LoopInit() {
		this.elapsed = 0;
	}

	protected Cleanup(): void {}
}
