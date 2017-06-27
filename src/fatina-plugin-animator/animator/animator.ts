import { IControl } from '../../fatina/core/interfaces/IControl';
import { AnimatorManager } from '../manager/animatorManager';

export interface IAnimationParams {
	group?: string;
	unstoppable?: boolean;
	finalValue?: boolean;
}

/**
 * Animator component applied on a object.
 * This store a list of animations and manage them for that object
 *
 * @export
 * @class Animator
 */
export class Animator {
	public animations: { [id: string]: IControl; } = {};
	public current: { [id: string]: IControl | undefined } = {};
	public layers = ['default'];

	private object: any;
	private animatorManager: AnimatorManager;
	private animGroupMap: { [id: string]: string } = {};
	private animFinalValueMap: { [id: string]: boolean } = {};
	private animUnstoppableMap: { [id: string]: boolean } = {};
	private currentAnimName: { [id: string]: string } = {};

	constructor(obj: any, animatorManager: AnimatorManager) {
		this.object = obj;
		this.animatorManager = animatorManager;
	}

	public AddAnimation(name: string, animationName: string, options?: IAnimationParams | any, params?: any): Animator {
		const anim: any = this.animatorManager.Instantiate(animationName, this.object, params);
		return this.AddCustomAnimation(name, options || {}, anim);
	}

	public AddCustomAnimation(name: string, options: IAnimationParams | any, tween: IControl): Animator {
		const anim: any = tween;
		anim.OnKilled(() => anim.Recycle());
		anim.OnComplete(() => anim.Recycle());

		this.animations[name] = anim;
		this.animFinalValueMap[name] = options ? !!options.finalValue : false;
		this.animUnstoppableMap[name] = options ? !!options.unstoppable : false;
		this.animGroupMap[name] = (options && options.group) ? options.group : 'default';
		if (this.layers.indexOf(this.animGroupMap[name]) === -1) {
			this.layers.push(this.animGroupMap[name]);
		}
		return this;
	}

	public Play(name: string): IControl {
		if (!(name in this.animations)) {
			throw new Error('this animation doesnt exist ' + name);
		}

		const layerName = this.animGroupMap[name];
		let current = this.current[layerName];

		// Block any unstoppable running anim
		if (current && current.IsRunning() && this.animUnstoppableMap[this.currentAnimName[layerName]]) {
			console.log('This animation already run and is unstoppable', this.currentAnimName[layerName], '->', name);
			return current;
		}

		// Stop any previous animation on this layer
		if (current && (current.IsRunning() || current.IsPaused())) {
			const currentAnimName = this.currentAnimName[layerName];
			current.Skip(this.animFinalValueMap[currentAnimName]);
			this.current[layerName] = undefined;
		}

		// Start the right animation
		current = this.animations[name];
		this.current[layerName] = current;
		this.currentAnimName[layerName] = name;
		current.Start();
		return current;
	}

	public Pause(layer?: string): void {
		const layerName = !layer ? 'default' : layer;
		const current = this.current[layerName];
		if (current && current.IsRunning()) {
			current.Pause();
		}
	}

	public PauseAll() {
		for (const layerId of this.layers) {
			this.Pause(layerId);
		}
	}

	public Resume(layer?: string): void {
		const layerName = !layer ? 'default' : layer;
		const current = this.current[layerName];
		if (current && current.IsPaused()) {
			current.Resume();
		}
	}

	public ResumeAll() {
		for (const layerId of this.layers) {
			this.Resume(layerId);
		}
	}

	public Stop(layer?: string): void {
		const layerName = !layer ? 'default' : layer;
		const current = this.current[layerName];
		if (current && !current.IsFinished()) {
			const currentAnimName = this.currentAnimName[layerName];
			current.Skip(this.animFinalValueMap[currentAnimName]);
			this.current[layerName] = undefined;
		}
	}

	public StopAll() {
		for (const layerId of this.layers) {
			this.Stop(layerId);
		}
	}

	public Destroy() {
		for (const layerId of this.layers) {
			const current = this.current[layerId];
			if (current && !current.IsFinished()) {
				current.Kill();
			}
		}

		this.animations = {};
		this.animGroupMap = {};
		this.animFinalValueMap = {};
		this.animUnstoppableMap = {};
		this.current = {};
		this.currentAnimName = {};
		delete this.object.Animator;
	}
}
