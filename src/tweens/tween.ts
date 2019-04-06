import { State } from '../core/enum/state';
import { ISequence } from '../core/interfaces/ISequence';
import { ITween } from '../core/interfaces/ITween';
import { easeNames } from '../easing/easing';
import { EasingType } from '../easing/easingType';
import { BaseTween } from './baseTween';
import { Sequence } from './sequence';

/**
 * Tween: Used to animate values of an object
 *
 * @export
 * @class Tween
 * @extends {BaseTween}
 * @implements {ITween}
 */
export class Tween extends BaseTween<Tween> implements ITween {
	// properties
	/**
	 * @private
	 */
	private obj: any;
	/**
	 * @private
	 */
	private readonly prop: string[] = [];

	// user from & to
	/**
	 * @private
	 */
	private f: any;
	/**
	 * @private
	 */
	private t: any;

	// current value from & to (can changed based on yoyo, reset, ...)
	/**
	 * @private
	 */
	private cf: any;
	/**
	 * @private
	 */
	private ct: any;

	// options
	/**
	 * @private
	 */
	private steps = 0;
	/**
	 * @private
	 */
	private relative = false;
	/**
	 * @private
	 */
	private ease: (t: number) => number;

	// cache
	/**
	 * @private
	 */
	private p = 0;
	/**
	 * @private
	 */
	private v = 0;
	/**
	 * @private
	 */
	private remains = 0;

	/**
	 * Creates an instance of Tween.
	 *
	 * @param {*} object
	 */
	constructor(object: any) {
		super();

		this.obj = object;
		this.tickCb = this.tick.bind(this);
	}

	/**
	 * Used to define the object and the properties modified by this tween
	 *
	 * @param {*} object
	 */
	public init(object: any) {
		this.obj = object;
		this.prop.length = 0;
	}

	/**
	 * Method used on start to check the values of this tween
	 *
	 * @protected
	 */
	protected validate() {
		// Check the object
		if (!this.obj) {
			throw new Error('undefined object');
		}

		// Check this tween will be updated
		if (!this.parent) {
			throw new Error('no ticker');
		}

		// Easing
		if (!this.ease) {
			this.ease = easeNames[EasingType.Linear];
		}

		this.check();
	}

	/**
	 * Method used to calculate currentFrom/currentTo based on the config
	 *
	 * @protected
	 */
	protected check() {
		if (!this.cf) {
			this.cf = {};
		}
		if (!this.ct) {
			this.ct = {};
		}

		for (const prop of this.prop) {
			// From
			if (!this.f) {
				this.cf[prop] = this.obj[prop];
			} else {
				this.cf[prop] = this.f[prop];
				this.obj[prop] = this.f[prop];
			}

			// Relative
			if (this.relative) {
				this.ct[prop] = this.obj[prop] + this.t[prop];
			} else {
				this.ct[prop] = this.t[prop];
			}
		}
	}

	/**
	 * @private
	 */
	private tick(dt: number) {
		if (this.state >= 3) {
			return;
		}

		this.remains = dt * this.timescale;
		while (this.remains > 0) {
			this.elapsed += this.remains;
			this.p = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
			this.v = this.ease(this.p);

			// Yoyo easing (need to be reversed)
			if (this.yo && (this.yo.original - this.yo.value) % 2 === 1) {
				this.v = 1 - this.ease(1 - this.p);
			}

			// Steps behaviour
			if (this.steps !== 0) {
				this.v = Math.round(this.v * this.steps) / this.steps;
			}

			// Update if the object still exist
			for (const prop of this.prop) {
				this.obj[prop] = this.cf[prop] + (this.ct[prop] - this.cf[prop]) * this.v;
			}

			if (this.events.update) {
				this.emitEvent(this.events.update, [this.remains, this.v]);
			}

			if (this.elapsed < this.duration) {
				return;
			}

			this.remains = this.elapsed - this.duration;

			// Yoyo effect ( A -> B -> A )
			if (this.yo && this.yo.value !== 0) {
				this.reverse();
				this.resetAndStart(0);
				this.yo.value--;
				continue;
			}

			// Loop management
			if (this.loop) {
				this.loop.value--;
				if (this.loop.value !== 0) {
					this.check();
					this.resetAndStart(0);
					continue;
				}
			}

			this.complete();
			return;
		}
	}

	/**
	 * Method used to set the values at the beginning of the tween
	 *
	 * @param {*} from
	 * @returns {ITween}
	 */
	public from(from: any): ITween {
		this.f = from;
		this.updateProp();
		return this;
	}

	/**
	 * Method used to set the values at the end of the tween
	 *
	 * @param {*} to
	 * @param {number} duration
	 * @returns {ITween}
	 */
	public to(to: any, duration: number): ITween {
		this.t = to;
		this.duration = duration;
		this.updateProp();
		return this;
	}

	/**
	 * Compute the properties
	 *
	 * @private
	 */
	private updateProp() {
		if (!this.obj) {
			return;
		}

		for (const index in this.t) {
			if (this.t.hasOwnProperty(index)) {
				this.prop.push(index);
			}
		}

		this.prop.filter((el, i, a) => i === a.indexOf(el));
	}

	/**
	 * Method used to define if the tween as to work in relative or not
	 *
	 * @param {boolean} relative
	 * @returns {ITween}
	 */
	public setRelative(relative: boolean): ITween {
		this.relative = relative;
		return this;
	}

	/**
	 * To apply a modifier on a current tween
	 *
	 * @param {*} diff
	 * @param {boolean} updateTo
	 */
	public modify(diff: any, updateTo: boolean): void {
		for (const prop of this.prop) {
			if (!diff.hasOwnProperty(prop)) {
				continue;
			}

			this.obj[prop] += diff[prop];

			if (updateTo) {
				this.ct[prop] += diff[prop];
			} else {
				this.cf[prop] += diff[prop];
			}
		}
	}

	/**
	 * Overwrite the Reset (just for yoyo)
	 *
	 * @param {boolean} [skipParent]
	 */
	public reset(skipParent?: boolean): void {
		if (this.yo) {
			if ((this.yo.original - this.yo.value) % 2 === 1) {
				let previous = this.cf;
				this.cf = this.ct;
				this.ct = previous;

				previous = this.f;
				this.f = this.t;
				this.t = previous;

				const elapsed = (1 - (this.elapsed / this.duration)) * this.duration;
				this.elapsed = Math.round(elapsed * 1000) / 1000;
			}

			this.yo.value = this.yo.original;
		}
		super.reset(skipParent);
	}

	/**
	 * Method used to reverse the tween
	 */
	public reverse(): void {
		let previous = this.cf;
		this.cf = this.ct;
		this.ct = previous;

		previous = this.f;
		this.f = this.t;
		this.t = previous;

		const elapsed = (1 - (this.elapsed / this.duration)) * this.duration;
		this.elapsed = Math.round(elapsed * 1000) / 1000;

		if (this.state === State.Finished) {
			this.reset(true);
			this.start();
		}
	}

	/**
	 * Method used to reverse the tween N times at the end
	 *
	 * @param {number} time
	 * @returns {ITween}
	 */
	public yoyo(time: number): ITween {
		if (!this.yo) {
			this.yo = { original: 0, value: 0 };
		}
		this.yo.original = time;
		this.yo.value = time;
		return this;
	}

	/**
	 * Method used to Quantify the tween value to a certain amount of steps
	 *
	 * @param {number} steps
	 * @returns {ITween}
	 */
	public setSteps(steps: number): ITween {
		this.steps = steps;
		return this;
	}

	/**
	 * Method used to create a sequence with this tween as first value.
	 * Usually used with .AppendInterval(1250) or .PrependInterval(160) to add a delay
	 *
	 * @returns {ISequence}
	 */
	public toSequence(): ISequence {
		if (!this.parent) {
			throw new Error('parent ticker not defined');
		}
		return new Sequence().setParent(this.parent).append(this);
	}

	/**
	 * Method used to set the type of easing for this tween
	 *
	 * @param {(EasingType | string)} type
	 * @returns {ITween}
	 */
	public setEasing(type: EasingType | string): ITween {
		if (!(type in easeNames)) {
			throw new Error(`unknown easing method ${type}`);
		}

		this.ease = easeNames[type];
		return this;
	}

	/**
	 * Method used when the tween is reset (loop)
	 *
	 * @protected
	 */
	protected loopInit() {
		this.elapsed = 0;
	}
}
