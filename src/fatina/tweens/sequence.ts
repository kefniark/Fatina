import { BaseTween } from './baseTween';
import { ITicker } from '../core/interfaces/ITicker';
import { ISequence } from '../core/interfaces/ISequence';
import { ITween } from '../core/interfaces/ITween';
import { IPlayable } from '../core/interfaces/IPlayable';
import { Callback } from './callback';
import { Delay } from './delay';
import { TweenType } from '../core/enum/tweenType';
import { State } from '../core/enum/state';

export class Sequence extends BaseTween implements ISequence, ITicker, IPlayable {
	public get Type() {
		return TweenType.Sequence;
	}

	private eventTick: {(dt: number): void}[] = [];
	private eventStepStart: {(tween: ITween | IPlayable): void}[] = [];
	private eventStepEnd: {(tween: ITween | IPlayable): void}[] = [];
	private tweens: ((ITween | IPlayable)[])[] = [];
	private currentTween: (ITween | IPlayable)[] | undefined;
	private sequenceIndex = 0;
	private cleanTweens: (ITween | ISequence)[] = [];

	public get CurrentTween(): (ITween | IPlayable)[] | undefined {
		return this.currentTween;
	}

	constructor() {
		super();
		this.tickCb = (dt: number) => {
			if (this.state === State.Finished || this.state === State.Killed) {
				return;
			}
			let localDt = dt * this.timescale;
			this.elapsed += localDt;
			this.Tick(localDt);
		};
	}

	public Start(): ISequence {
		super.Start();
		return this;
	}

	protected Validate() {
	}

	protected LoopInit() {
		this.sequenceIndex = 0;
		for (let i = 0; i < this.tweens.length; i++) {
			let tweenArray = this.tweens[i];
			for (let j = 0; j < tweenArray.length; j++) {
				let tween = tweenArray[j];
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
				for (let i = 0; i < this.currentTween.length; i++) {
					let tween = this.currentTween[i];
					tween.Start();
				}

				this.StepStarted(this.currentTween[0]);
			}
		}

		if (this.currentTween) {
			// Tick every listener
			for (let i = this.eventTick.length - 1; i >= 0; i--) {
				this.eventTick[i](dt);
			}

			// Dont emit update event for remains dt
			if (remains !== true) {
				super.Updated(dt, 0);
			}
		}

		let remainsDt = dt;

		// Current tween over
		if (this.currentTween) {
			for (let i = 0; i < this.currentTween.length; i++) {
				if (!this.currentTween[i].IsCompleted()) {
					return;
				}
			}

			let first = this.currentTween[0];
			remainsDt = first.Elapsed - first.Duration;

			this.StepEnded(this.currentTween[0]);
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
				this.ResetAndStart(false, remainsDt);
			}
		}
	}

	private StepStarted(tween: (ITween | IPlayable)) {
		for (let i = 0; i < this.eventStepStart.length; i++) {
			try {
				this.eventStepStart[i](tween);
			} catch (e) {
				console.warn(e);
			}
		}
	}

	private StepEnded(tween: (ITween | IPlayable)) {
		for (let i = 0; i < this.eventStepEnd.length; i++) {
			try {
				this.eventStepEnd[i](tween);
			} catch (e) {
				console.warn(e);
			}
		}
	}

	public Append(tween: ITween | ISequence): ISequence {
		tween.SetParent(this);
		this.tweens[this.tweens.length] = [tween];
		return this;
	}

	public AppendCallback(cb: () => void): ISequence {
		let playable = new Callback(cb);
		playable.SetParent(this);
		this.tweens[this.tweens.length] = [playable];
		return this;
	}

	public AppendInterval(duration: number): ISequence {
		let playable = new Delay(duration);
		playable.SetParent(this);
		this.tweens[this.tweens.length] = [playable];
		return this;
	}

	public Prepend(tween: ITween | ISequence): ISequence {
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

	public Skip(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			console.warn('cant skip this tween, already in state', this.state);
			return;
		}
		for (let i = 0; i < this.tweens.length; i++) {
			let tweenArray = this.tweens[i];
			for (let j = 0; j < tweenArray.length; j++) {
				let tween = tweenArray[j];
				if (tween.IsKilled() || tween.IsCompleted()) {
					continue;
				}
				if (tween.Elapsed === 0) {
					this.StepStarted(tween);
				}
				tween.Skip();
				this.StepEnded(tween);
			}
		}
		super.Skip();
	}

	public Kill(): void {
		if (this.state === State.Killed || this.state === State.Finished) {
			console.warn('cant kill this tween, already in state', this.state);
			return;
		}
		for (let i = 0; i < this.tweens.length; i++) {
			let tweenArray = this.tweens[i];
			for (let j = 0; j < tweenArray.length; j++) {
				let tween = tweenArray[j];
				if (tween.IsKilled() || tween.IsCompleted()) {
					continue;
				}
				tween.Kill();
			}
		}
		super.Kill();
	}

	public Join(tween: ITween | ISequence): ISequence {
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

	public Default() {
		super.Default();
		this.eventTick.length = 0;
		this.eventStepStart.length = 0;
		this.eventStepEnd.length = 0;
		this.tweens.length = 0;
		this.currentTween = undefined;
		this.sequenceIndex = 0;
		this.cleanTweens.length = 0;
	}

	public Cleanup() {
		if (!this.parent) {
			return;
		}

		this.cleanTweens[this.cleanTweens.length] = this;
		this.parent.Clean(this.cleanTweens);
	}

	public Clean(data: (ITween | ISequence)[]) {
		for (let i = 0; i < data.length; i++) {
			this.cleanTweens[this.cleanTweens.length] = data[i];
		}
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
		this.eventStepStart[this.eventStepStart.length] = cb;
		return this;
	}

	public OnStepEnd(cb: (index: ITween | IPlayable) => void): ISequence {
		this.eventStepEnd[this.eventStepEnd.length] = cb;
		return this;
	}
}
