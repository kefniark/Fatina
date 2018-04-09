import { BaseTween } from './tweens/baseTween';

export class Pool<T extends BaseTween<any>> {
	private readonly tmp: Set<T>;
	private readonly data: Set<T>;
	private readonly create: () => T;

	constructor(init: number, create: () => T) {
		this.data = new Set();
		this.tmp = new Set();
		this.create = create;
		for (let i = 0; i < init; i++) {
			this.data.add(create());
		}
	}

	public get(): T {
		const t = this.data.values().next().value;
		if (t) {
			this.data.delete(t);
			return t;
		}
		return this.create();
	}

	public add(tween: T) {
		this.tmp.add(tween);
	}

	public update() {
		if (this.tmp.size > 0) {
			for (const t of this.tmp) {
				t.recycle();
				this.data.add(t);
			}
			this.tmp.clear();
		}
	}
}
