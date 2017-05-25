import { BaseTween } from './baseTween';
import { ITicker } from '../core/interfaces/ITicker';
import { ITweenSequence } from '../core/interfaces/ITweenSequence';
import { ITweener } from '../core/interfaces/ITweener';
import { ITweenPlayable } from '../core/interfaces/ITweenPlayable';
import { PlayableCallback } from './playableCallback';
import { PlayableDelay } from './playableDelay';

export class Sequence extends BaseTween implements ITweenSequence, ITicker {
	private listenerTick: {(dt: number): void}[] = [];
	private listenerStepStart: {(tween: ITweener | ITweenPlayable): void}[] = [];
	private listenerStepEnd: {(tween: ITweener | ITweenPlayable): void}[] = [];
	private tweens: ((ITweener | ITweenPlayable)[])[] = [];
	private currentTween: (ITweener | ITweenPlayable)[] | undefined;
	private sequenceIndex = 0;

	public get CurrentTween(): (ITweener | ITweenPlayable)[] | undefined {
		return this.currentTween;
	}

	constructor() {
		super();
		this.tickCallback = (dt: number) => {
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

	public SetParent(ticker: ITicker): ITweenSequence {
		super.SetParent(ticker);
		return this;
	}

	public AddTickListener(cb: (dt: number) => void): void {
		this.listenerTick.unshift(cb);
	}

	public RemoveTickListener(cb: (dt: number) => void): void {
		let index = this.listenerTick.indexOf(cb);
		if (index !== -1) {
			this.listenerTick.splice(index, 1);
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
				for (let i = 0; i < this.listenerStepStart.length; i++) {
					this.listenerStepStart[i](this.currentTween[0]);
				}
			}
		}

		// Tick every listener
		for (let i = this.listenerTick.length - 1; i >= 0; i--) {
			this.listenerTick[i](dt);
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

			for (let i = 0; i < this.listenerStepEnd.length; i++) {
				this.listenerStepEnd[i](this.currentTween[0]);
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
				this.Reset();
				this.Start();
			}
		}
	}

	public Append(tween: ITweener): ITweenSequence {
		tween.SetParent(this);
		this.tweens.push([tween]);
		return this;
	}

	public AppendCallback(cb: () => void): ITweenSequence {
		let playable = new PlayableCallback(cb);
		playable.SetParent(this);
		this.tweens.push([playable]);
		return this;
	}

	public AppendInterval(duration: number): ITweenSequence {
		let playable = new PlayableDelay(duration);
		playable.SetParent(this);
		this.tweens.push([playable]);
		return this;
	}

	public Prepend(tween: ITweener): ITweenSequence {
		tween.SetParent(this);
		this.tweens.unshift([tween]);
		return this;
	}

	public PrependCallback(cb: () => void): ITweenSequence {
		let playable = new PlayableCallback(cb);
		playable.SetParent(this);
		this.tweens.unshift([playable]);
		return this;
	}

	public PrependInterval(duration: number): ITweenSequence {
		let playable = new PlayableDelay(duration);
		playable.SetParent(this);
		this.tweens.unshift([playable]);
		return this;
	}

	public Join(tween: ITweener): ITweenSequence {
		if (this.tweens.length === 0) {
			return this.Append(tween);
		}
		tween.SetParent(this);
		this.tweens[this.tweens.length - 1].push(tween);
		return this;
	}

	public SetTimescale(scale: number): ITweenSequence {
		this.timescale = scale;
		return this;
	}

	public SetLoop(loop: number): ITweenSequence {
		this.loop = Math.round(loop);
		return this;
	}

	public OnStart(cb: () => void): ITweenSequence {
		super.OnStart(cb);
		return this;
	}

	public OnUpdate(cb: (dt: number, progress: number) => void): ITweenSequence {
		super.OnUpdate(cb);
		return this;
	}

	public OnKilled(cb: () => void): ITweenSequence {
		super.OnKilled(cb);
		return this;
	}

	public OnComplete(cb: () => void): ITweenSequence {
		super.OnComplete(cb);
		return this;
	}

	public OnStepStart(cb: (index: ITweener | ITweenPlayable) => void): ITweenSequence {
		this.listenerStepStart.push(cb);
		return this;
	}

	public OnStepEnd(cb: (index: ITweener | ITweenPlayable) => void): ITweenSequence {
		this.listenerStepEnd.push(cb);
		return this;
	}
}
