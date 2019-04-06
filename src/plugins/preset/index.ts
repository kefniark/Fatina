import { IPlugin } from '../../core/interfaces/IPlugin';
import { ISequence } from '../../core/interfaces/ISequence';
import { ITween } from '../../core/interfaces/ITween';
import { IFatinaPluginPreset, IPulsePresetParams, IScalePresetParams, IShakePresetParams, ISonarPresetParams } from '../../core/plugins/preset';
import { Fatina } from '../../fatina';
import { pulsePreset, scalePreset, shakePreset, sonarPreset, wobblePreset } from './preset';

export function get(): IPlugin {
	return new FatinaPluginPreset();
}

export class FatinaPluginPreset implements IPlugin {
	public readonly name = 'fatina-plugin-preset';
	private initialized = false;

	public init(fatina: Fatina) {
		if (this.initialized || !fatina || fatina.plugin === null) {
			throw new Error('Cannot initialize ' + this.name);
		}

		const plugin = fatina as IFatinaPluginPreset;
		plugin.pulse = (obj: any, settings?: IPulsePresetParams | any): ISequence => pulsePreset(fatina, obj, settings);
		plugin.scale = (obj: any, settings?: IScalePresetParams | any): ITween => scalePreset(fatina, obj, settings);
		plugin.wobble = (obj: any, settings?: IScalePresetParams | any): ITween => wobblePreset(fatina, obj, settings);
		plugin.sonar = (obj: any, settings?: ISonarPresetParams | any): ITween => sonarPreset(fatina, obj, settings);
		plugin.shake = (obj: any, settings?: IShakePresetParams | any): ITween => shakePreset(fatina, obj, settings);

		this.initialized = true;
	}
}
