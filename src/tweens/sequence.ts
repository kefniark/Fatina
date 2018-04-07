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
	// events
	private evtStepStart: {(tween: ITween | IPlayable): void}[] | undefined;
	private evtStepEnd: {(tween: ITween | IPlayable): void}[] | undefined;
	private readonly evtTick: Set<{(dt: number): void}> = new Set();
	private readonly tweens: ((ITween | IPlayable)[])[] = [];

	// public properties
	public ct: (ITween | IPlayable)[] | undefined;
	private index = 0;

	public get count(): number {
		return this.tweens.length;
	}

	constructor(tweens?: ITween[] | ISequence[] | IPlayable[]) {
		super();
		this.tickCb = this.tick.bind(this);

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
		if (this.state === State.Finished || this.state === State.Killed) {
			return;
		}
		const localDt = dt * this.timescale;
		this.elapsed += localDt;
		this.localTick(localDt);
	}

	private localTick(dt: number, remains?: boolean) {
		// If no current tween, take the first one and start it
		if (!this.ct) {
			this.nextTween();
		}

		if (this.ct) {
			// Tick every listener
			this.evtTick.forEach((tick) => tick(dt));

			// Dont emit update event for remains dt
			if (remains !== true) {
				this.emitEvent(this.evtUpdate, [dt, 0]);
			}
		}

		let remainsDt = dt;

		// Current tween over
		if (this.ct) {
			for (const current of this.ct) {
				if (current.state !== State.Finished) {
					return;
				}
			}

			const first = this.ct[0];
			remainsDt = first.elapsed - first.duration;

			this.emitEvent(this.evtStepEnd, [this.ct[0]]);
			this.ct = undefined;
			this.index++;

			if (remainsDt > 0.01) {
				this.localTick(remainsDt, true);
				return;
			}
		}

		// Complete
		if (!this.ct && this.tweens.length === this.index) {
			if (this.loop) {
				this.loop.value--;
				if (this.loop.value !== 0) {
					this.resetAndStart(remainsDt);
					return;
				}
			}

			this.complete();
		}
	}

	private nextTween() {
		this.ct = this.tweens[this.index];
		if (this.ct) {
			for (const tween of this.ct) {
				tween.start();
			}

			this.emitEvent(this.evtStepStart, [this.ct[0]]);
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
		if (this.state === State.Killed || this.state === State.Finished) {
			this.info(Log.Info, 'Cannot skip this tween ', this.state);
			return;
		}

		for (const tweenArray of this.tweens) {
			for (const tween of tweenArray) {
				if (tween.elapsed === 0) {
					this.emitEvent(this.evtStepStart, [tween]);
				}
				tween.skip(finalValue);
				this.emitEvent(this.evtStepEnd, [tween]);
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
		if (!this.evtStepStart) {
			this.evtStepStart = new Array(0);
		}
		this.evtStepStart[this.evtStepStart.length] = cb;
		return this;
	}

	public onStepEnd(cb: (index: ITween | IPlayable) => void): ISequence {
		if (!this.evtStepEnd) {
			this.evtStepEnd = new Array(0);
		}
		this.evtStepEnd[this.evtStepEnd.length] = cb;
		return this;
	}
}
