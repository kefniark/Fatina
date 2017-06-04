import { Tween } from '../tweens/tween';
import { ITween } from '../core/interfaces/ITween';

export class TweenPool {
	private targetSize: number;
	private tweens: ITween[] = [];

	constructor(size: number) {
		this.targetSize = size * 2;
		for (let i = 0; i < size; i ++) {
			this.Add(this.CreateTween());
		}
	}

	private Add(tween: ITween) {
		this.tweens.push(tween);
	}

	private Pop(): ITween | undefined {
		return this.tweens.shift();
	}

	private CreateTween(): ITween {
		return new Tween(null, []);
	}

	public PopTween(): ITween {
		let tween = this.Pop() as any;
		if (tween === undefined) {
			return this.CreateTween();
		}
		tween.Default();
		return tween;
	}

	public PushTween(tween: ITween) {
		if (tween === undefined) {
			return;
		}

		if (this.tweens.length > this.targetSize) {
			return;
		}
		tween.Default();
		this.Add(tween);
	}
}
