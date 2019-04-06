import { IPlugin, ISequence } from '../..';
import { ITween } from '../../core/interfaces/ITween';
import { IArcParams, ICurveParams, IFatinaPluginBezier, IPathParams } from '../../core/plugins/bezier';
import { Fatina } from '../../fatina';
import { arc, curve, path } from './interpolation';

export function get(): IPlugin {
	return new FatinaPluginBezier();
}

export class FatinaPluginBezier implements IPlugin {
	public readonly name = 'fatina-plugin-bezier';
	private initialized = false;

	public init(fatina: Fatina) {
		if (this.initialized || !fatina || fatina.plugin === null) {
			throw new Error('Cannot initialize ' + this.name);
		}

		const plugin = fatina as IFatinaPluginBezier;
		plugin.curve = (obj: any, settings?: ICurveParams | any): ITween => curve(fatina, obj, settings);
		plugin.arc = (obj: any, settings?: IArcParams | any): ITween => arc(fatina, obj, settings);
		plugin.path = (obj: any, settings?: IPathParams | any): ISequence => path(fatina, obj, settings);
		this.initialized = true;
	}
}
