import { ITicker } from './core/interfaces/ITicker';

export class TweenManager implements ITicker {
	private timescale = 1;

	private listenerTick: { (dt: number): void }[] = [];

	AddTickListener(cb: (dt: number) => void): void {
		this.listenerTick.unshift(cb);
	}

	RemoveTickListener(cb: (dt: number) => void): void {
		let index = this.listenerTick.indexOf(cb);
		if (index !== -1) {
			this.listenerTick.splice(index, 1);
		}
	}

	public Tick(dt: number) {
		let localDt = dt * this.timescale;
		for (let i = this.listenerTick.length - 1; i >= 0; i--) {
			this.listenerTick[i](localDt);
		}
	}

	public get Elapsed(): number {
		return 0;
	}

	public get Duration(): number {
		return 0;
	}

	IsCompleted(): boolean {
		return false;
	}

	Start(): void {
		throw new Error('Method not implemented.');
	}

	Pause(): void {
		throw new Error('Method not implemented.');
	}

	Resume(): void {
		throw new Error('Method not implemented.');
	}

	Kill(): void {
		throw new Error('Method not implemented.');
	}

	Reset(): void {
		throw new Error('Method not implemented.');
	}

	IsRunning(): boolean {
		throw new Error('Method not implemented.');
	}

	IsKilled(): boolean {
		throw new Error('Method not implemented.');
	}
}
