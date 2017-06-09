import { BaseTween } from './baseTween';
import { IPlayable } from '../core/interfaces/IPlayable';

export class Callback extends BaseTween implements IPlayable {
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
		this.EmitUpdateEvent(dt, 1);
		this.Complete();
	}
}
