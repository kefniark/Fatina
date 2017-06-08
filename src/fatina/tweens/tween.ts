
import { BaseTween } from './baseTween';
import { ITween } from '../core/interfaces/ITween';
import { ITicker } from '../core/interfaces/ITicker';
import { EasingType } from '../core/enum/easingType';
import { easeNames, easeTypes } from '../easing/easing';
import { Sequence } from './sequence';
import { ISequence } from '../core/interfaces/ISequence';
import { TweenType } from '../core/enum/tweenType';
import { State } from '../core/enum/state';

/**
 * Tween class
 * Takes control of a/many values of one object and animates them.
 *
 * @export
 * @class Tween
 * @extends {BaseTween}
 * @implements {ITween}
 */
export class Tween extends BaseTween implements ITween {
	public readonly type = TweenType.Tween;

	private object: any;
	private properties: string[];
	private from: any;
	private to: any;
	private currentFrom: any;
	private currentTo: any;
	private cleaned: boolean;
	private remainsDt: number;
	private relative = false;
	private ease: (t: number, args?: any) => number;

	constructor(object: any, properties: string[]) {
		super();

		this.object = object;
		this.properties = properties;
		this.tickCb = this.Tick.bind(this);
	}

	/**
	 * Used to define the object and the properties modified by this tween
	 *
	 * @param {*} object
	 * @param {string[]} properties
	 *
	 * @memberOf Tween
	 */
	public Init(object: any, properties: string[]) {
		this.object = object;
		this.properties = properties;
	}

	/**
	 * Method used to start a tween
	 *
	 * @returns {ITween}
	 *
	 * @memberOf Tween
	 */
	public Start(): ITween {
		super.Start();
		return this;
	}

	/**
	 * Method used on start to check the values of this tween
	 *
	 * @protected
	 *
	 * @memberOf Tween
	 */
	protected Validate() {
		// Check the object
		if (!this.object) {
			throw new Error('Cant Tween a undefined object');
		}

		// Check the properties of that object
		for (let i = 0; i < this.properties.length; i++) {
			let prop = this.properties[i];
			if (!(prop in this.object)) {
				throw new Error('Cant Tween an unknown property' + prop);
			}
		}

		// Check this tween will be updated
		if (!this.parent) {
			throw new Error('Cant Start a tween without ticker');
		}

		// Easing
		if (!this.ease) {
			this.ease = easeTypes[EasingType.Linear];
		}

		this.CheckPosition();
	}

	protected CheckPosition() {
		this.currentFrom = {};
		this.currentTo = {};

		// From
		if (!this.from) {
			for (let i = 0; i < this.properties.length; i++) {
				let prop = this.properties[i];
				this.currentFrom[prop] = this.object[prop];
			}
		} else {
			for (let i = 0; i < this.properties.length; i++) {
				let prop = this.properties[i];
				this.currentFrom[prop] = this.from[prop];
				this.object[prop] = this.from[prop];
			}
		}

		// Relative
		if (this.relative) {
			for (let i = 0; i < this.properties.length; i++) {
				let prop = this.properties[i];
				this.currentTo[prop] = this.object[prop] + this.to[prop];
			}
		} else {
			for (let i = 0; i < this.properties.length; i++) {
				let prop = this.properties[i];
				this.currentTo[prop] = this.to[prop];
			}
		}
	}

	/**
	 *
	 *
	 * @private
	 * @param {number} dt
	 * @returns
	 *
	 * @memberof Tween
	 */
	private Tick(dt: number) {
		if (this.state === State.Finished || this.state === State.Killed) {
			return;
		}

		this.remainsDt = dt * this.timescale;

		while (this.remainsDt > 0) {
			this.elapsed += this.remainsDt;
			let progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
			this.Update(this.remainsDt, progress);

			if (this.elapsed < this.duration) {
				return;
			}

			this.remainsDt = this.elapsed - this.duration;
			this.loop--;
			if (this.loop === 0) {
				for (let i = 0; i < this.properties.length; i++) {
					let prop = this.properties[i];
					this.object[prop] = this.currentTo[prop];
				}
				this.Complete();
				return;
			}

			this.CheckPosition();
			this.ResetAndStart(false, 0);
		}
	}

	/**
	 * Method used to update the properties and emit the onUpdate event
	 *
	 * @private
	 * @param {number} dt
	 * @param {number} progress
	 *
	 * @memberOf Tween
	 */
	private Update(dt: number, progress: number) {
		let val = this.ease(progress);
		for (let i = 0; i < this.properties.length; i++) {
			let prop = this.properties[i];
			this.object[prop] = this.currentFrom[prop] + (this.currentTo[prop] - this.currentFrom[prop]) * val;
		}
		this.Updated(dt, progress);
	}

	/**
	 * Method used to define the ticker of this tween
	 * When Fatina.Tween is used, the main ticker is automatically defined as parent
	 *
	 * @param {ITicker} ticker
	 * @returns {ITween}
	 *
	 * @memberOf Tween
	 */
	public SetParent(ticker: ITicker): ITween {
		super.SetParent(ticker);
		return this;
	}

	/**
	 * Method used to set the values at the beginning of the tween
	 *
	 * @param {*} from
	 * @returns {ITween}
	 *
	 * @memberOf Tween
	 */
	public From(from: any): ITween {
		this.from = from;
		return this;
	}

	/**
	 * Method used to set the values at the end of the tween
	 *
	 * @param {*} to
	 * @param {number} duration
	 * @returns {ITween}
	 *
	 * @memberOf Tween
	 */
	public To(to: any, duration: number): ITween {
		this.to = to;
		this.duration = duration;
		return this;
	}

	/**
	 * Method used to define how many time the tween has to loop
	 * Extra: if -1 the tween will loop forever
	 *
	 * @param {number} loop
	 * @returns {ITween}
	 *
	 * @memberOf Tween
	 */
	public SetLoop(loop: number): ITween {
		this.loop = Math.round(loop);
		return this;
	}

	/**
	 * Method used to define if the tween as to work in relative or not
	 *
	 * @param {boolean} relative
	 * @returns {ITween}
	 *
	 * @memberOf Tween
	 */
	public SetRelative(relative: boolean): ITween {
		this.relative = relative;
		return this;
	}

	/**
	 * Method used to change the timescale of the tween
	 *
	 * @param {number} scale
	 * @returns {ITween}
	 *
	 * @memberOf Tween
	 */
	public SetTimescale(scale: number): ITween {
		this.timescale = scale;
		return this;
	}

	/**
	 * To apply a modifier on a current tween
	 *
	 * @param {*} diff
	 * @param {boolean} updateTo
	 *
	 * @memberof Tween
	 */
	public Modify(diff: any, updateTo: boolean): void {
		for (let i = 0; i < this.properties.length; i++) {
			let prop = this.properties[i];
			if (!diff.hasOwnProperty(prop)) {
				continue;
			}
			this.object[prop] += diff[prop];
			if (updateTo) {
				this.currentTo[prop] += diff[prop];
			} else {
				this.currentFrom[prop] += diff[prop];
			}
		}
	}

	/**
	 * Method used to create a sequence with this tween as first value.
	 * Usually used with .AppendInterval(1250) or .PrependInterval(160) to add a delay
	 *
	 * @returns {ISequence}
	 *
	 * @memberOf Tween
	 */
	public ToSequence(): ISequence {
		if (!this.parent) {
			throw new Error('Cant convert to a sequence, parent ticker not defined');
		}
		return new Sequence().SetParent(this.parent).Append(this);
	}

	private Easing(type: EasingType | string): (t: number) => number {
		let name = type as string;
		let isNumber = !isNaN(parseFloat(name));

		if (isNumber) {
			let index = parseInt(name, 10);
			if (index in easeTypes) {
				return easeTypes[index];
			}
		}

		if (name in easeNames) {
			return easeNames[name];
		}

		throw new Error('Unknown ease method ' + type);
	}

	/**
	 * Method used to set the type of easing for this tween
	 *
	 * @param {(EasingType | string)} type
	 * @returns {ITween}
	 *
	 * @memberOf Tween
	 */
	public SetEasing(type: EasingType | string): ITween {
		this.ease = this.Easing(type)
		return this;
	}

	/**
	 * Method used when the tween is reset (loop)
	 *
	 * @protected
	 *
	 * @memberOf Tween
	 */
	protected LoopInit() {
		this.elapsed = 0;
	}

	/**
	 * Method used to notify the ticker that this tween is finished (can be clean)
	 *
	 * @returns
	 *
	 * @memberOf Tween
	 */
	public Cleanup() {
		if (!this.parent || this.cleaned) {
			return;
		}
		this.cleaned = true;
		// this.parent.Clean([this]);
	}

	/**
	 * Method used set everything back to normal values
	 *
	 *
	 * @memberOf Tween
	 */
	public Default() {
		super.Default();
		this.object = undefined;
		this.properties.length = 0;
		this.from = undefined;
		this.to = undefined;
		this.currentFrom = undefined;
		this.currentTo = undefined;
		this.relative = false;
		this.ease = easeTypes[0];
		this.cleaned = false;
	}

	public OnStart(cb: () => void): ITween {
		super.OnStart(cb);
		return this;
	}

	public OnUpdate(cb: (dt: number, progress: number) => void): ITween {
		super.OnUpdate(cb);
		return this;
	}

	public OnKilled(cb: () => void): ITween {
		super.OnKilled(cb);
		return this;
	}

	public OnComplete(cb: () => void): ITween {
		super.OnComplete(cb);
		return this;
	}
}
