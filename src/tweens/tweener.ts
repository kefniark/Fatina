
import { BaseTween } from './baseTween';
import { ITweener } from '../core/interfaces/ITweener';
import { ITicker } from '../core/interfaces/ITicker';
import { EasingType } from '../core/enum/easingType';
import { Linear, InQuad, OutQuad, InOutQuad, InCubic, OutCubic, InOutCubic, InQuart, OutQuart, InOutQuart, InSine, OutSine, InOutSine, InCirc, OutCirc, InOutCirc } from '../easing/easing';

export class Tweener extends BaseTween implements ITweener {
	private object: any;
	private properties: string[];
	private from: any;
	private to: any;

	private relative: boolean;
	private loop: number;
	private ease: (t: number, args?: any) => number;

	constructor(object: any, properties: string[]) {
		super();

		this.object = object;
		this.properties = properties;

		this.tickCallback = (dt: number) => {
			this.elapsed += dt;

			let progress = Math.max(Math.min(this.elapsed / this.duration, 1), 0);
			this.Update(dt, progress);

			if (this.elapsed >= this.duration) {
				this.Complete();
			}
		};
	}

	protected Validate() {
		// Check object
		if (!this.object) {
			throw new Error('Cant Tween a undefined object');
		}

		for (let prop of this.properties) {
			if (!(prop in this.object)) {
				throw new Error('Cant Tween an unknown property' + prop);
			}
		}

		if (!this.parent) {
			throw new Error('Cant Start a tween without ticker');
		}

		// Easing
		if (!this.ease) {
			this.ease = Linear;
		}

		// From
		if (!this.from) {
			this.from = {};
			for (let prop of this.properties) {
				this.from[prop] = this.object[prop];
			}
		} else {
			for (let prop of this.properties) {
				this.object[prop] = this.from[prop];
			}
		}

		// Relative
		if (this.relative) {
			for (let prop of this.properties) {
				this.to[prop] = this.object[prop] + this.to[prop];
			}
		}
	}

	private Update(dt: number, progress: number) {
		let val = this.ease(progress);
		for (let prop of this.properties) {
			this.object[prop] = this.from[prop] + (this.to[prop] - this.from[prop]) * val;
		}
		super.Updated(dt, progress);
	}

	public SetParent(ticker: ITicker): ITweener {
		super.SetParent(ticker);
		return this;
	}

	public From(from: any): ITweener {
		this.from = from;
		return this;
	}

	public To(to: any, duration: number): ITweener {
		this.to = to;
		this.duration = duration;
		return this;
	}

	public SetLoop(loop: number): ITweener {
		this.loop = loop;
		return this;
	}

	public SetRelative(relative: boolean): ITweener {
		this.relative = relative;
		return this;
	}

	private Easing(type: EasingType | string, args: any): (t: number) => number {
		switch (type) {
			case EasingType.Linear:
			case 'linear':
				return Linear;
			case EasingType.InQuad:
			case 'inQuad':
				return InQuad;
			case EasingType.OutQuad:
			case 'outQuad':
				return OutQuad;
			case EasingType.InOutQuad:
			case 'inOutQuad':
				return InOutQuad;
			case EasingType.InCubic:
			case 'inCubic':
				return InCubic;
			case EasingType.OutCubic:
			case 'outCubic':
				return OutCubic;
			case EasingType.InOutCubic:
			case 'inOutCubic':
				return InOutCubic;
			case EasingType.InQuart:
			case 'inQuart':
				return InQuart;
			case EasingType.OutQuart:
			case 'outQuart':
				return OutQuart;
			case EasingType.InOutQuart:
			case 'inOutQuart':
				return InOutQuart;
			case EasingType.InSine:
			case 'inSine':
				return InSine;
			case EasingType.OutSine:
			case 'outSine':
				return OutSine;
			case EasingType.InOutSine:
			case 'inOutSine':
				return InOutSine;
			case EasingType.InCirc:
			case 'inCirc':
				return InCirc;
			case EasingType.OutCirc:
			case 'outCirc':
				return OutCirc;
			case EasingType.InOutCirc:
			case 'inOutCirc':
				return InOutCirc;
			default:
				console.warn('unknown ease method', type, args);
		}

		return Linear;
	}

	public SetEasing(type: EasingType | string, args: any): ITweener {
		this.ease = this.Easing(type, args)
		return this;
	}

	public OnStart(cb: () => void): ITweener {
		super.OnStart(cb);
		return this;
	}

	public OnUpdate(cb: (dt: number, progress: number) => void): ITweener {
		super.OnUpdate(cb);
		return this;
	}

	public OnKilled(cb: () => void): ITweener {
		super.OnKilled(cb);
		return this;
	}

	public OnComplete(cb: () => void): ITweener {
		super.OnComplete(cb);
		return this;
	}
}
