import { ISequence } from '../core/interfaces/ISequence';
import { Sequence } from '../tweens/sequence';

export class SequencePool {
	private targetSize: number;
	private sequences: ISequence[] = [];

	constructor(size: number) {
		this.targetSize = size * 2;
		for (let i = 0; i < size; i ++) {
			this.Add(this.CreateSequence());
		}
	}

	private Add(tween: ISequence) {
		this.sequences.push(tween);
	}

	private Pop(): ISequence | undefined {
		return this.sequences.shift();
	}

	private CreateSequence(): ISequence {
		return new Sequence();
	}

	public PopSequence(): ISequence {
		let sequence = this.Pop();
		if (sequence === undefined) {
			return this.CreateSequence();
		}
		sequence.Default();
		return sequence;
	}

	public PushSequence(sequence: ISequence) {
		if (sequence === undefined) {
			return;
		}

		if (this.sequences.length > this.targetSize) {
			return;
		}

		sequence.Default();
		this.Add(sequence);
	}
}
