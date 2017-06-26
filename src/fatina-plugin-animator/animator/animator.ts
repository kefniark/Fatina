// import { IControl } from '../../fatina/core/interfaces/IControl';
// import { AnimatorManager } from '../manager/animatorManager';

// /**
//  * Animator component applied on a object.
//  * This store a list of animations and manage them for that object
//  *
//  * @export
//  * @class Animator
//  */
// export class Animator {
// 	public animations: { [id: string]: IControl; } = {};
// 	public current: { [id: string]: IControl | undefined } = {};
// 	public layers = ['default'];

// 	private object: any;
// 	private animatorManager: AnimatorManager;
// 	private layerMap: { [id: string]: string } = {};
// 	private skipMap: { [id: string]: boolean } = {};
// 	private lastAnimName: { [id: string]: string } = {};

// 	constructor(obj: any, animatorManager: AnimatorManager) {
// 		this.object = obj;
// 		this.animatorManager = animatorManager;
// 	}

// 	public AddAnimation(name: string, animationName: string, finalValue?: boolean, layer?: string, params?: any): Animator {
// 		const anim: any = this.animatorManager.Instantiate(animationName, this.object, params);
// 		// anim.OnStart(() => console.warn('OnStart', name, animationName, this.object.name, this.object.position));
// 		// anim.OnComplete(() => console.log('OnComplete', name, animationName, this.object.name, this.object.position));
// 		anim.OnKilled(() => anim.Recycle());
// 		anim.OnComplete(() => anim.Recycle());

// 		this.animations[name] = anim;
// 		this.skipMap[name] = !!finalValue;
// 		this.layerMap[name] = !layer ? 'default' : layer;
// 		if (this.layers.indexOf(this.layerMap[name]) === -1) {
// 			this.layers.push(this.layerMap[name]);
// 		}
// 		return this;
// 	}

// 	public Play(name: string): IControl {
// 		if (!(name in this.animations)) {
// 			throw new Error('this animation doesnt exist ' + name);
// 		}

// 		const layerName = this.layerMap[name];
// 		let current = this.current[layerName];

// 		// Stop any previous animation on this layer
// 		if (current && (current.IsRunning() || current.IsPaused())) {
// 			const currentAnimName = this.lastAnimName[layerName];
// 			current.Skip(this.skipMap[currentAnimName]);
// 			this.current[layerName] = undefined;
// 		}

// 		// Start the right animation
// 		current = this.animations[name];
// 		this.current[layerName] = current;
// 		this.lastAnimName[layerName] = name;
// 		current.Start();
// 		return current;
// 	}

// 	public Pause(layer?: string): void {
// 		const layerName = !layer ? 'default' : layer;
// 		const current = this.current[layerName];
// 		if (current && current.IsRunning()) {
// 			current.Pause();
// 		}
// 	}

// 	public PauseAll() {
// 		for (const layerId of this.layers) {
// 			this.Pause(layerId);
// 		}
// 	}

// 	public Resume(layer?: string): void {
// 		const layerName = !layer ? 'default' : layer;
// 		const current = this.current[layerName];
// 		if (current && current.IsPaused()) {
// 			current.Resume();
// 		}
// 	}

// 	public ResumeAll() {
// 		for (const layerId of this.layers) {
// 			this.Resume(layerId);
// 		}
// 	}

// 	public Stop(layer?: string): void {
// 		const layerName = !layer ? 'default' : layer;
// 		const current = this.current[layerName];
// 		if (current && !current.IsFinished()) {
// 			const currentAnimName = this.lastAnimName[layerName];
// 			current.Skip(this.skipMap[currentAnimName]);
// 			this.current[layerName] = undefined;
// 		}
// 	}

// 	public StopAll() {
// 		for (const layerId of this.layers) {
// 			this.Stop(layerId);
// 		}
// 	}

// 	public Destroy() {
// 		for (const layerId of this.layers) {
// 			const current = this.current[layerId];
// 			if (current && !current.IsFinished()) {
// 				current.Kill();
// 			}
// 		}
// 		this.animations = {};
// 		this.layerMap = {};
// 		this.skipMap = {};
// 		this.current = {};
// 		this.lastAnimName = {};
// 		delete this.object.Animator;
// 	}
// }
