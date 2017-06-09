import { BaseTween } from './baseTween';
import { IPlayable } from '../core/interfaces/IPlayable';

export class Delay extends BaseTween implements IPlayable {

	constructor(duration: number) {
		super();
		this.duration = duration;
		this.tickCb = this.Tick.bind(this);
	}

	private Tick(dt: number) {
		this.elapsed += dt;
		let progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
		this.EmitUpdateEvent(dt, progress);
		if (this.elapsed >= this.duration) {
			this.Complete();
		}
	}
}
