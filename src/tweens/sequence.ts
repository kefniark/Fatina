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
	/**
	 * @private
	 */
	private readonly evtTick: Set<{(dt: number): void}> = new Set();
	/**
	 * @private
	 */
	private readonly tweens: ((ITween | IPlayable)[])[] = [];
	/**
	 * @private
	 */
	private index = 0;

	// cache
	/**
	 * @private
	 */
	private cur: (ITween | IPlayable)[] | undefined;
	/**
	 * @private
	 */
	private remains = 0;
	/**
	 * Number of tween in this sequence
	 *
	 * @readonly
	 * @type {number}
	 */
	public get count(): number {
		return this.tweens.length;
	}

	/**
	 * Creates an instance of Sequence.
	 *
	 * @constructor
	 * @param {(ITween[] | ISequence[] | IPlayable[])} [tweens]
	 */
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

	/**
	 * @protected
	 */
	protected loopInit() {
		this.index = 0;
		for (const tweenArray of this.tweens) {
			for (const tween of tweenArray) {
				tween.reset();
			}
		}
	}

	/**
	 * Add a child to tick
	 *
	 * @param {(dt: number) => void} cb
	 */
	public addTick(cb: (dt: number) => void): void {
		this.evtTick.add(cb);
	}

	/**
	 * Remove a child to tick
	 *
	 * @param {(dt: number) => void} cb
	 * @memberof Sequence
	 */
	public removeTick(cb: (dt: number) => void): void {
		this.evtTick.delete(cb);
	}

	/**
	 * @private
	 */
	private tick(dt: number) {
		if (this.state >= 3) {
			return;
		}
		this.remains = dt * this.timescale;
		this.elapsed += this.remains;
		this.localTick(this.remains);
	}

	/**
	 * @private
	 * @param {number} dt
	 * @param {boolean} [remains]
	 * @returns
	 */
	private localTick(dt: number, remains?: boolean) {
		// If no current tween, take the first one and start it
		if (!this.cur) {
			this.nextTween();
		}

		if (this.cur) {
			// Tick every listener
			this.evtTick.forEach(function (tick) { tick(dt); });

			// Dont emit update event for remains dt
			if (remains !== true && this.events.update) {
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

			if (this.events.stepEnd) {
				this.emitEvent(this.events.stepEnd, this.cur[0]);
			}

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

	/**
	 * @private
	 */
	private nextTween() {
		this.cur = this.tweens[this.index];
		if (!this.cur) {
			return;
		}

		for (const tween of this.cur) {
			tween.start();
		}

		if (this.events.stepStart) {
			this.emitEvent(this.events.stepStart, this.cur[0]);
		}
	}

	/**
	 *
	 *
	 * @param {(ITween | ISequence)} tween
	 * @returns {ISequence}
	 * @memberof Sequence
	 */
	public append(tween: ITween | ISequence): ISequence {
		tween.setParent(this);
		this.tweens[this.tweens.length] = [tween];
		return this;
	}

	/**
	 *
	 *
	 * @param {() => void} cb
	 * @returns {ISequence}
	 * @memberof Sequence
	 */
	public appendCallback(cb: () => void): ISequence {
		const playable = new Callback(cb);
		playable.setParent(this);
		this.tweens[this.tweens.length] = [playable];
		return this;
	}

	/**
	 *
	 *
	 * @param {number} duration
	 * @returns {ISequence}
	 * @memberof Sequence
	 */
	public appendInterval(duration: number): ISequence {
		const playable = new Delay(duration);
		playable.setParent(this);
		this.tweens[this.tweens.length] = [playable];
		return this;
	}

	/**
	 *
	 *
	 * @param {(ITween | ISequence)} tween
	 * @returns {ISequence}
	 * @memberof Sequence
	 */
	public prepend(tween: ITween | ISequence): ISequence {
		tween.setParent(this);
		this.tweens.unshift([tween]);
		return this;
	}

	/**
	 *
	 *
	 * @param {() => void} cb
	 * @returns {ISequence}
	 * @memberof Sequence
	 */
	public prependCallback(cb: () => void): ISequence {
		const playable = new Callback(cb);
		playable.setParent(this);
		this.tweens.unshift([playable]);
		return this;
	}

	/**
	 *
	 *
	 * @param {number} duration
	 * @returns {ISequence}
	 * @memberof Sequence
	 */
	public prependInterval(duration: number): ISequence {
		const playable = new Delay(duration);
		playable.setParent(this);
		this.tweens.unshift([playable]);
		return this;
	}

	/**
	 * @inheritdoc
	 *
	 * @param {boolean} [finalValue]
	 * @returns {void}
	 */
	public skip(finalValue?: boolean): void {
		if (this.state >= 3) {
			this.info(Log.Info, 'Cannot skip this tween ', this.state);
			return;
		}

		for (const tweenArray of this.tweens) {
			for (const tween of tweenArray) {
				if (tween.elapsed === 0) {
					this.emitEvent(this.events.stepStart, tween);
				}

				tween.skip(finalValue);
				this.emitEvent(this.events.stepEnd, tween);
			}
		}
		super.skip();
	}

	/**
	 * @inheritdoc
	 */
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

	/**
	 * @param {(ITween | ISequence)} tween
	 * @returns {ISequence}
	 */
	public join(tween: ITween | ISequence): ISequence {
		if (this.tweens.length === 0) {
			return this.append(tween);
		}
		tween.setParent(this);
		this.tweens[this.tweens.length - 1].push(tween);
		return this;
	}

	/**
	 *
	 *
	 * @param {((index: ITween | IPlayable) => void)} cb
	 * @returns {ISequence}
	 */
	public onStepStart(cb: (index: ITween | IPlayable) => void): ISequence {
		return this.onEvent('stepStart', cb);
	}

	/**
	 *
	 *
	 * @param {((index: ITween | IPlayable) => void)} cb
	 * @returns {ISequence}
	 */
	public onStepEnd(cb: (index: ITween | IPlayable) => void): ISequence {
		return this.onEvent('stepEnd', cb);
	}
}
