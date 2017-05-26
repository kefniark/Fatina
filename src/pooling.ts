import { ITween } from './core/interfaces/ITween';
import { Tween } from './tweens/tween';

export class Pooling {
	private tweens: ITween[] = [];

	constructor(size: number) {
		for (let i = 0; i < size; i ++) {
			this.CreateTween();
		}
	}

	private CreateTween(): ITween {
		return new Tween(null, []);
	}

	public PopTween(): ITween {
		if (this.tweens.length === 0) {
			this.tweens.push(this.CreateTween());
		}
		return this.tweens.pop() as ITween;
	}

	public PushTween(tween: ITween) {
		if (tween === undefined) {
			return;
		}
		this.tweens.push(tween);
	}
}
