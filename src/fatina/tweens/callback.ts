import { BaseTween } from './baseTween';
import { IPlayable } from '../core/interfaces/IPlayable';
import { TweenType } from '../core/enum/tweenType';

export class Callback extends BaseTween implements IPlayable {
	public get Type() {
		return TweenType.Callback;
	}

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

	protected Cleanup(): void {}
}
