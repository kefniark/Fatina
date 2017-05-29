
import { BaseTween } from './baseTween';
import { ITween } from '../core/interfaces/ITween';
import { ITicker } from '../core/interfaces/ITicker';
import { EasingType } from '../core/enum/easingType';
import { easeNames, easeTypes } from '../easing/easing';
import { Sequence } from './sequence';
import { ISequence } from '../core/interfaces/ISequence';
import { TweenType } from '../core/enum/tweenType';

export class Tween extends BaseTween implements ITween {
	public get Type() {
		return TweenType.Tween;
	}

	private object: any;
	private properties: string[];
	private from: any;
	private to: any;

	private relative = false;
	private ease: (t: number, args?: any) => number;

	constructor(object: any, properties: string[]) {
		super();

		this.object = object;
		this.properties = properties;

		this.tickCb = (dt: number) => {
			let localDt = dt * this.timescale;
			this.elapsed += localDt;

			let progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
			this.Update(localDt, progress);

			if (this.elapsed >= this.duration) {
				this.loop--;
				if (this.loop === 0) {
					this.Complete();
				} else {
					this.ResetAndStart();
				}
			}
		};
	}

	public Init(object: any, properties: string[]) {
		this.object = object;
		this.properties = properties;
	}

	public Start(): ITween {
		super.Start();
		return this;
	}

	protected Validate() {
		// Check object
		if (!this.object) {
			throw new Error('Cant Tween a undefined object');
		}

		for (let i = 0; i < this.properties.length; i++) {
			let prop = this.properties[i];
			if (!(prop in this.object)) {
				throw new Error('Cant Tween an unknown property' + prop);
			}
		}

		if (!this.parent) {
			throw new Error('Cant Start a tween without ticker');
		}

		// Easing
		if (!this.ease) {
			this.ease = easeTypes[EasingType.Linear];
		}

		// From
		if (!this.from) {
			this.from = {};
			for (let i = 0; i < this.properties.length; i++) {
				let prop = this.properties[i];
				this.from[prop] = this.object[prop];
			}
		} else {
			for (let i = 0; i < this.properties.length; i++) {
				let prop = this.properties[i];
				this.object[prop] = this.from[prop];
			}
		}

		// Relative
		if (this.relative) {
			for (let i = 0; i < this.properties.length; i++) {
				let prop = this.properties[i];
				this.to[prop] = this.object[prop] + this.to[prop];
			}
		}
	}

	protected LoopInit() {
		this.elapsed = 0;

		if (this.from) {
			for (let i = 0; i < this.properties.length; i++) {
				let prop = this.properties[i];
				this.object[prop] = this.from[prop];
			}
		}
	}

	private Update(dt: number, progress: number) {
		let val = this.ease(progress);
		for (let i = 0; i < this.properties.length; i++) {
			let prop = this.properties[i];
			this.object[prop] = this.from[prop] + (this.to[prop] - this.from[prop]) * val;
		}
		super.Updated(dt, progress);
	}

	public SetParent(ticker: ITicker): ITween {
		super.SetParent(ticker);
		return this;
	}

	public Cleanup() {
		if (!this.parent) {
			return;
		}
		this.parent.Clean([this]);
	}

	public Default() {
		super.Default();
		this.object = undefined;
		this.properties = [];
		this.from = undefined;
		this.to = undefined;
		this.relative = false;
		this.ease = easeTypes[0];
	}

	public From(from: any): ITween {
		this.from = from;
		return this;
	}

	public To(to: any, duration: number): ITween {
		this.to = to;
		this.duration = duration;
		return this;
	}

	public SetLoop(loop: number): ITween {
		this.loop = Math.round(loop);
		return this;
	}

	public SetRelative(relative: boolean): ITween {
		this.relative = relative;
		return this;
	}

	public SetTimescale(scale: number): ITween {
		this.timescale = scale;
		return this;
	}

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

	public SetEasing(type: EasingType | string): ITween {
		this.ease = this.Easing(type)
		return this;
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
