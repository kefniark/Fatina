import { IPlugin, ISequence } from '../..';
import { ITween } from '../../core/interfaces/ITween';
import { Fatina } from '../../fatina';
import { IArcParams, ICurveParams, IPathParams } from './core';
import { arc, curve, path } from './interpolation';

export interface IFatinaPluginBezier extends Fatina {
	curve: (obj: any, settings?: ICurveParams | any) => ITween;
	arc: (obj: any, settings?: IArcParams | any) => ITween;
	path: (obj: any, settings?: IPathParams | any) => ISequence;
}

export function get(): IPlugin {
	return new FatinaPluginBezier();
}

export class FatinaPluginBezier implements IPlugin {
	public readonly name = 'fatina-plugin-bezier';
	private initialized = false;

	public init(fatina: Fatina) {
		if (this.initialized) {
			throw new Error('Try to init the plugin twice : ' + name);
		}

		if (fatina === undefined || fatina === null || fatina.plugin === null) {
			throw new Error('Try to init the plugin without fatina : ' + name);
		}

		const plugin = fatina as IFatinaPluginBezier;
		plugin.curve = (obj: any, settings?: ICurveParams | any): ITween => curve(fatina, obj, settings);
		plugin.arc = (obj: any, settings?: IArcParams | any): ITween => arc(fatina, obj, settings);
		plugin.path = (obj: any, settings?: IPathParams | any): ISequence => path(fatina, obj, settings);
		this.initialized = true;
	}
}
