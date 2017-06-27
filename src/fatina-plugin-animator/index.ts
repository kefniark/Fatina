import { IPlugin } from '../fatina/core/interfaces/IPlugin';
import { AnimatorManager } from './manager/animatorManager';
import { TickerManager } from './manager/tickerManager';

export function Get(): IPlugin {
	return new FatinaPluginAnimator();
}

export interface IPluginAnimator {
	AnimatorManager: AnimatorManager;
	TickerManager: TickerManager;
}

export class FatinaPluginAnimator implements IPlugin {
	public readonly name = 'fatina-plugin-animator';
	public fatina: any;
	private init = false;

	public get TickerManager() {
		return this.fatina.plugin.TickerManager;
	}

	public get AnimatorManager() {
		return this.fatina.plugin.AnimatorManager;
	}

	public Init(fatina: any) {
		if (this.init) {
			throw new Error('Try to init the plugin twice : ' + name);
		}

		if (fatina === undefined || fatina === null || fatina.plugin === null) {
			throw new Error('Try to init the plugin without fatina : ' + name);
		}

		this.fatina = fatina;
		this.init = true;
		fatina.plugin.AnimatorManager = new AnimatorManager(this);
		fatina.plugin.TickerManager = new TickerManager(this);
	}
}
