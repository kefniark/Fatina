// import { IControl } from '../../fatina/core/interfaces/IControl';
// import { Animator } from '../animator/animator';
// import { FatinaPluginAnimator } from '../index';

// export class AnimatorManager {
// 	private plugin: FatinaPluginAnimator;
// 	private animations: { [id: string]: (object: any, params?: any) => IControl; } = {};
// 	private tickerMap: { [id: string]: string; } = {};

// 	public get Animations(): string[] {
// 		return Object.keys(this.animations);
// 	}

// 	public get Labels(): string[] {
// 		return Object.keys(this.tickerMap).map((x: string) => this.tickerMap[x]).filter((piece, index, self) => self.indexOf(piece) === index);
// 	}

// 	constructor(plugin: FatinaPluginAnimator) {
// 		this.plugin = plugin;
// 	}

// 	public Register(name: string, onCreate: (object: any, params?: any) => IControl, label?: string): AnimatorManager {
// 		if (this.animations[name] && this.tickerMap[name]) {
// 			delete this.tickerMap[name];
// 		}
// 		this.animations[name] = onCreate;
// 		if (label) {
// 			this.tickerMap[name] = label;
// 		}
// 		return this;
// 	}

// 	public Instantiate(name: string, object: any, params?: any): IControl {
// 		if (!(name in this.animations)) {
// 			throw new Error('this animation doesnt exist ' + name);
// 		}

// 		const tween = this.animations[name](object, params);
// 		if (this.tickerMap[name]) {
// 			(tween as any).SetParent(this.plugin.TickerManager.Get(this.tickerMap[name]));
// 		}

// 		return tween;
// 	}

// 	public AddAnimatorTo(obj: any): Animator {
// 		if (!obj.Animator) {
// 			obj.Animator = new Animator(obj, this);
// 		}
// 		return obj.Animator;
// 	}
// }
