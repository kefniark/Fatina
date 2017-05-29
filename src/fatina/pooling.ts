import { ITween } from './core/interfaces/ITween';
import { Tween } from './tweens/tween';
import { ISequence } from './core/interfaces/ISequence';
import { Sequence } from './tweens/sequence';

export class Pooling {
	private targetSize: number;
	private tweens: ITween[] = [];
	private sequences: ISequence[] = [];
	private created = 0;
	private poped = 0;
	private pushed = 0;

	constructor(size: number) {
		this.targetSize = size * 2;
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
		return this.tweens.pop() as ITween;
	}

	public PushTween(tween: ITween) {
		if (tween === undefined) {
			return;
		}

		if (this.tweens.length > this.targetSize) {
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
		return this.sequences.pop() as ISequence;
	}

	public PushSequence(sequence: ISequence) {
		if (sequence === undefined) {
			return;
		}

		if (this.tweens.length > this.targetSize) {
			return;
		}

		sequence.Default();
		this.pushed ++;
		this.sequences.push(sequence);
	}
}
