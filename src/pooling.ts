import { ITween } from './core/interfaces/ITween';
import { Tween } from './tweens/tween';

export class Pooling {
	private tweens: ITween[] = [];
	private created = 0;
	private poped = 0;
	private pushed = 0;

	constructor(size: number) {
		for (let i = 0; i < size; i ++) {
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
		console.log('[Pooling] create:', this.created, ' | pop:', this.poped, ' | push:', this.pushed);
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
}
