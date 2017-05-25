/**
 * Class used to auto-tick based on the browser requestAnimationFrame
 *
 * Based on API from mozilla :
 *  - https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame
 *  - https://developer.mozilla.org/fr/docs/Web/API/Window/cancelAnimationFrame
 *
 * @export
 * @class AutoTick
 */
export class AutoTick {
	private requestFrame: any = window.requestAnimationFrame || (window as any).mozRequestAnimationFrame || window.webkitRequestAnimationFrame || (window as any).msRequestAnimationFrame;
	private cancelFrame = window.cancelAnimationFrame || (window as any).mozCancelAnimationFrame;

	private tickable: (t: number) => void;
	private last: any;

	constructor(tick: (t: number) => void) {
		this.tickable = tick;
	}

	public Start(): void {
		this.last = this.requestFrame(this.Update)
	}

	private Update(dt: number) {
		this.tickable(dt);
		this.last = this.requestFrame(this.Update)
	}

	public Stop(): void {
		if (!this.last) {
			return;
		}
		this.cancelFrame(this.last);
	}
}
