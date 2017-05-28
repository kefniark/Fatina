import { ITween } from './core/interfaces/ITween';
import { Tween } from './tweens/tween';
import { ISequence } from './core/interfaces/ISequence';
import { Sequence } from './tweens/sequence';

export class Pooling {
	private tweens: ITween[] = [];
	private sequences: ISequence[] = [];
	private created = 0;
	private poped = 0;
	private pushed = 0;

	constructor(size: number) {
		for (let i = 0; i < size; i ++) {
			this.CreateTween();
		}
		for (let i = 0; i < size / 4; i ++) {
			this.CreateTween();
		}
	}

	private CreateTween(): ITween {
		this.created ++;
		return new Tween(null, []);
	}

	public PopTween(): ITween {
		if (this.tweens.length === 0) {
			this.tweens.push(this.CreateTween());
		}
		this.poped ++;
		// console.log('[Pooling] create:', this.created, ' | pop:', this.poped, ' | push:', this.pushed);
		return this.tweens.pop() as ITween;
	}

	public PushTween(tween: ITween) {
		if (tween === undefined) {
			return;
		}
		tween.Default();
		this.pushed ++;
		this.tweens.push(tween);
	}

	private CreateSequence(): ISequence {
		this.created ++;
		return new Sequence();
	}

	public PopSequence(): ISequence {
		if (this.sequences.length === 0) {
			this.sequences.push(this.CreateSequence());
		}
		this.poped ++;
		// console.log('[Pooling] create:', this.created, ' | pop:', this.poped, ' | push:', this.pushed);
		return this.sequences.pop() as ISequence;
	}

	public PushSequence(sequence: ISequence) {
		if (sequence === undefined) {
			return;
		}
		sequence.Default();
		this.pushed ++;
		this.sequences.push(sequence);
	}
}
