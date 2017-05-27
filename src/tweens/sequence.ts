import { BaseTween } from './baseTween';
import { ITicker } from '../core/interfaces/ITicker';
import { ISequence } from '../core/interfaces/ISequence';
import { ITween } from '../core/interfaces/ITween';
import { IPlayable } from '../core/interfaces/IPlayable';
import { Callback } from './callback';
import { Delay } from './delay';
import { TweenType } from '../core/enum/tweenType';

export class Sequence extends BaseTween implements ISequence, ITicker {
	public get Type() {
		return TweenType.Sequence;
	}

	private eventTick: {(dt: number): void}[] = [];
	private eventStepStart: {(tween: ITween | IPlayable): void}[] = [];
	private eventStepEnd: {(tween: ITween | IPlayable): void}[] = [];
	private tweens: ((ITween | IPlayable)[])[] = [];
	private currentTween: (ITween | IPlayable)[] | undefined;
	private sequenceIndex = 0;

	public get CurrentTween(): (ITween | IPlayable)[] | undefined {
		return this.currentTween;
	}

	constructor() {
		super();
		this.tickCb = (dt: number) => {
			let localDt = dt * this.timescale;
			this.elapsed += localDt;
			this.Tick(localDt);
		};
	}

	protected Validate() {
	}

	protected LoopInit() {
		this.sequenceIndex = 0;
		for (let tweenArray of this.tweens) {
			for (let tween of tweenArray) {
				(tween as BaseTween).Reset(true);
			}
		}
	}

	public SetParent(ticker: ITicker): ISequence {
		super.SetParent(ticker);
		return this;
	}

	public AddTickListener(cb: (dt: number) => void): void {
		this.eventTick.unshift(cb);
	}

	public RemoveTickListener(cb: (dt: number) => void): void {
		let index = this.eventTick.indexOf(cb);
		if (index !== -1) {
			this.eventTick.splice(index, 1);
		}
	}

	private Tick(dt: number, remains?: boolean) {
		// If no current tween, take the first one and start it
		if (!this.currentTween) {
			this.currentTween = this.tweens[this.sequenceIndex];
			if (this.currentTween) {
				for (let tween of this.currentTween) {
					tween.Start();
				}
				for (let i = 0; i < this.eventStepStart.length; i++) {
					this.eventStepStart[i](this.currentTween[0]);
				}
			}
		}

		// Tick every listener
		for (let i = this.eventTick.length - 1; i >= 0; i--) {
			this.eventTick[i](dt);
		}

		// Dont emit update event for remains dt
		if (remains !== true) {
			super.Updated(dt, 0);
		}

		// Current tween over
		if (this.currentTween) {
			if (this.currentTween.some(x => !x.IsCompleted())) {
				return;
			}

			let first = this.currentTween[0];
			let remainsDt = first.Elapsed - first.Duration;

			for (let i = 0; i < this.eventStepEnd.length; i++) {
				this.eventStepEnd[i](this.currentTween[0]);
			}
			this.currentTween = undefined;
			this.sequenceIndex++;

			if (remainsDt > 0.01) {
				this.Tick(remainsDt, true);
				return;
			}
		}

		// Complete
		if (!this.currentTween && this.tweens.length === this.sequenceIndex) {
			this.loop--;
			if (this.loop === 0) {
				this.Complete();
			} else {
				this.ResetAndStart();
			}
		}
	}

	public Append(tween: ITween): ISequence {
		tween.SetParent(this);
		this.tweens.push([tween]);
		return this;
	}

	public AppendCallback(cb: () => void): ISequence {
		let playable = new Callback(cb);
		playable.SetParent(this);
		this.tweens.push([playable]);
		return this;
	}

	public AppendInterval(duration: number): ISequence {
		let playable = new Delay(duration);
		playable.SetParent(this);
		this.tweens.push([playable]);
		return this;
	}

	public Prepend(tween: ITween): ISequence {
		tween.SetParent(this);
		this.tweens.unshift([tween]);
		return this;
	}

	public PrependCallback(cb: () => void): ISequence {
		let playable = new Callback(cb);
		playable.SetParent(this);
		this.tweens.unshift([playable]);
		return this;
	}

	public PrependInterval(duration: number): ISequence {
		let playable = new Delay(duration);
		playable.SetParent(this);
		this.tweens.unshift([playable]);
		return this;
	}

	public Kill(): void {
		super.Kill();
		for (let tweenArray of this.tweens) {
			for (let tween of tweenArray) {
				if (tween.IsKilled() || tween.IsCompleted()) {
					continue;
				}
				tween.Kill();
			}
		}
	}

	public Join(tween: ITween): ISequence {
		if (this.tweens.length === 0) {
			return this.Append(tween);
		}
		tween.SetParent(this);
		this.tweens[this.tweens.length - 1].push(tween);
		return this;
	}

	public SetTimescale(scale: number): ISequence {
		this.timescale = scale;
		return this;
	}

	public SetLoop(loop: number): ISequence {
		this.loop = Math.round(loop);
		return this;
	}

	public OnStart(cb: () => void): ISequence {
		super.OnStart(cb);
		return this;
	}

	public OnUpdate(cb: (dt: number, progress: number) => void): ISequence {
		super.OnUpdate(cb);
		return this;
	}

	public OnKilled(cb: () => void): ISequence {
		super.OnKilled(cb);
		return this;
	}

	public OnComplete(cb: () => void): ISequence {
		super.OnComplete(cb);
		return this;
	}

	public OnStepStart(cb: (index: ITween | IPlayable) => void): ISequence {
		this.eventStepStart.push(cb);
		return this;
	}

	public OnStepEnd(cb: (index: ITween | IPlayable) => void): ISequence {
		this.eventStepEnd.push(cb);
		return this;
	}
}