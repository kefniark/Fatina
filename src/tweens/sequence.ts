import { Log } from '../core/enum/log';
import { State } from '../core/enum/state';
import { IPlayable } from '../core/interfaces/IPlayable';
import { ISequence } from '../core/interfaces/ISequence';
import { ITicker } from '../core/interfaces/ITicker';
import { ITween } from '../core/interfaces/ITween';
import { BaseTween } from './baseTween';
import { Callback } from './callback';
import { Delay } from './delay';

/**
 * Sequence: used to animate other tweens or sequence
 * Can play them sequentially or in parallel
 *
 * @export
 * @class Sequence
 * @extends {BaseTween}
 * @implements {ISequence}
 * @implements {ITicker}
 * @implements {IPlayable}
 */
export class Sequence extends BaseTween<Sequence> implements ISequence, ITicker, IPlayable {
	private readonly evtTick: Set<{(dt: number): void}> = new Set();
	private tweens: ((ITween | IPlayable)[])[] = [];
	private index = 0;

	// cache
	private cur: (ITween | IPlayable)[] | undefined;
	private remains = 0;

	public get count(): number {
		return this.tweens.length;
	}

	constructor(tweens?: ITween[] | ISequence[] | IPlayable[]) {
		super();
		this.tickCb = this.tick.bind(this);
		this.init(tweens);
	}

	public init(tweens?: ITween[] | ISequence[] | IPlayable[]) {
		if (tweens) {
			this.tweens = new Array(tweens.length);
			for (let i = 0; i < tweens.length; i++) {
				tweens[i].setParent(this);
				this.tweens[i] = [tweens[i]];
			}
		}
	}

	protected loopInit() {
		this.index = 0;
		for (const tweenArray of this.tweens) {
			for (const tween of tweenArray) {
				tween.reset();
			}
		}
	}

	public addTick(cb: (dt: number) => void): void {
		this.evtTick.add(cb);
	}

	public removeTick(cb: (dt: number) => void): void {
		this.evtTick.delete(cb);
	}

	private tick(dt: number) {
		if (this.state >= 3) {
			return;
		}
		this.remains = dt * this.timescale;
		this.elapsed += this.remains;
		this.localTick(this.remains);
	}

	private localTick(dt: number, remains?: boolean) {
		// If no current tween, take the first one and start it
		if (!this.cur) {
			this.nextTween();
		}

		if (this.cur) {
			// Tick every listener
			this.evtTick.forEach(function (tick) { tick(dt); });

			// Dont emit update event for remains dt
			if (remains !== true) {
				this.emitEvent(this.events.update, [dt, 0]);
			}
		}

		this.remains = dt;

		// Current tween over
		if (this.cur) {
			for (const current of this.cur) {
				if (current.state !== State.Finished) {
					return;
				}
			}

			this.remains = this.cur[0].elapsed - this.cur[0].duration;

			this.emitEvent(this.events.stepEnd, [this.cur[0]]);
			this.cur = undefined;
			this.index++;

			if (this.remains > 0.01) {
				this.localTick(this.remains, true);
				return;
			}
		}

		// Complete
		if (!this.cur && this.tweens.length === this.index) {
			if (this.loop) {
				this.loop.value--;
				if (this.loop.value !== 0) {
					this.resetAndStart(this.remains);
					return;
				}
			}

			this.complete();
		}
	}

	protected final(): void {
		if (!this.events.finally) {
			return;
		}
		for (const line of this.tweens) {
			for (const tween of line) {
				(tween as any).final();
			}
		}
		super.final();
	}

	private nextTween() {
		this.cur = this.tweens[this.index];
		if (this.cur) {
			for (const tween of this.cur) {
				tween.start();
			}

			this.emitEvent(this.events.stepStart, [this.cur[0]]);
		}
	}

	public append(tween: ITween | ISequence): ISequence {
		tween.setParent(this);
		this.tweens[this.tweens.length] = [tween];
		return this;
	}

	public appendCallback(cb: () => void): ISequence {
		const playable = new Callback(cb);
		playable.setParent(this);
		this.tweens[this.tweens.length] = [playable];
		return this;
	}

	public appendInterval(duration: number): ISequence {
		const playable = new Delay(duration);
		playable.setParent(this);
		this.tweens[this.tweens.length] = [playable];
		return this;
	}

	public prepend(tween: ITween | ISequence): ISequence {
		tween.setParent(this);
		this.tweens.unshift([tween]);
		return this;
	}

	public prependCallback(cb: () => void): ISequence {
		const playable = new Callback(cb);
		playable.setParent(this);
		this.tweens.unshift([playable]);
		return this;
	}

	public prependInterval(duration: number): ISequence {
		const playable = new Delay(duration);
		playable.setParent(this);
		this.tweens.unshift([playable]);
		return this;
	}

	public skip(finalValue?: boolean): void {
		if (this.state >= 3) {
			this.info(Log.Info, 'Cannot skip this tween ', this.state);
			return;
		}

		for (const tweenArray of this.tweens) {
			for (const tween of tweenArray) {
				if (tween.elapsed === 0) {
					this.emitEvent(this.events.stepStart, [tween]);
				}
				tween.skip(finalValue);
				this.emitEvent(this.events.stepEnd, [tween]);
			}
		}
		super.skip();
	}

	public kill(): void {
		if (this.state === State.Killed) {
			this.info(Log.Info, 'Cannot kill this tween ', this.state);
			return;
		}

		for (const tweenArray of this.tweens) {
			for (const tween of tweenArray) {
				tween.kill();
			}
		}

		super.kill();
	}

	public join(tween: ITween | ISequence): ISequence {
		if (this.tweens.length === 0) {
			return this.append(tween);
		}
		tween.setParent(this);
		this.tweens[this.tweens.length - 1].push(tween);
		return this;
	}

	public onStepStart(cb: (index: ITween | IPlayable) => void): ISequence {
		return this.onEvent('stepStart', cb);
	}

	public onStepEnd(cb: (index: ITween | IPlayable) => void): ISequence {
		return this.onEvent('stepEnd', cb);
	}
}
