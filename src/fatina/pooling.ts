import { ITween } from './core/interfaces/ITween';
import { Tween } from './tweens/tween';
import { ISequence } from './core/interfaces/ISequence';
import { Sequence } from './tweens/sequence';

/**
 * This class is used to store unused tween and sequence to be able to reuse them later
 *
 * @export
 * @class Pooling
 */
export class Pooling {
	private targetSize: number;
	private tweenPool: ITween[] = [];
	private sequencePool: ISequence[] = [];

	constructor(size: number) {
		this.targetSize = size * 2;
		for (let i = 0; i < size; i ++) {
			this.tweenPool.push(this.CreateTween());
		}
		for (let i = 0; i < size / 4; i ++) {
			this.sequencePool.push(this.CreateSequence());
		}
	}

	/**
	 * Private method used to instantiate an empty tween
	 *
	 * @private
	 * @returns {ITween}
	 *
	 * @memberOf Pooling
	 */
	private CreateTween(): ITween {
		return new Tween(null, []);
	}

	/**
	 * Private method used to instantiate an empty sequence
	 *
	 * @private
	 * @returns {ISequence}
	 *
	 * @memberOf Pooling
	 */
	private CreateSequence(): ISequence {
		return new Sequence();
	}

	/**
	 * Method used to get a tween (create it if necessary)
	 *
	 * @returns {ITween}
	 *
	 * @memberOf Pooling
	 */
	public PopTween(): ITween {
		if (this.tweenPool.length === 0) {
			this.tweenPool.push(this.CreateTween());
		}
		return this.tweenPool.pop() as ITween;
	}

	/**
	 * Method used to get a sequence (create it if necessary)
	 *
	 * @returns {ISequence}
	 *
	 * @memberOf Pooling
	 */
	public PopSequence(): ISequence {
		if (this.sequencePool.length === 0) {
			this.sequencePool.push(this.CreateSequence());
		}
		return this.sequencePool.pop() as ISequence;
	}

	/**
	 * Method used to get a used tween back in the pool (to reuse it later)
	 *
	 * @param {ITween} tween
	 * @returns
	 *
	 * @memberOf Pooling
	 */
	public PushTween(tween: ITween) {
		if (tween === undefined) {
			return;
		}

		if (this.tweenPool.length > this.targetSize) {
			return;
		}

		tween.Default();
		this.tweenPool[this.tweenPool.length] = tween;
	}

	/**
	 * Method used to get a used sequence back in the pool (to reuse it later)
	 *
	 * @param {ISequence} sequence
	 * @returns
	 *
	 * @memberOf Pooling
	 */
	public PushSequence(sequence: ISequence) {
		if (sequence === undefined) {
			return;
		}

		if (this.tweenPool.length > this.targetSize) {
			return;
		}

		sequence.Default();
		this.sequencePool[this.sequencePool.length] = sequence;
	}
}
