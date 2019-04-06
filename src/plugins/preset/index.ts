import { IPlugin } from '../../core/interfaces/IPlugin';
import { ISequence } from '../../core/interfaces/ISequence';
import { ITween } from '../../core/interfaces/ITween';
import { Fatina } from '../../fatina';
import { ISonarPresetParams } from './core';
import { IPulsePresetParams, IScalePresetParams, IShakePresetParams, pulsePreset, scalePreset, shakePreset, sonarPreset, wobblePreset } from './preset';

export interface IFatinaPluginPreset extends Fatina {
	/**
	 * Pulse Animation
	 *
	 * @export
	 * @param {any} obj
	 * @param {IPulsePresetParams} settings
	 * @returns {ISequence}
	 */
	pulse: (obj: any, settings?: IPulsePresetParams | any) => ISequence;

	/**
	 * Strobe Animation
	 *
	 * @export
	 * @param {any} obj
	 * @param {IScalePresetParams} settings
	 * @returns {ITween}
	 */
	scale: (obj: any, settings?: IScalePresetParams | any) => ITween;

	/**
	 * Wobble Animation
	 *
	 * @export
	 * @param {any} obj
	 * @param {IScalePresetParams} settings
	 * @returns {ITween}
	 */
	wobble: (obj: any, settings?: IScalePresetParams | any) => ITween;

	/**
	 * Sonar Animation
	 *
	 * @export
	 * @param {any} obj
	 * @param {ISonarPresetParams} settings
	 * @returns {ITween}
	 */
	sonar: (obj: any, settings?: ISonarPresetParams | any) => ITween;

	/**
	 * Sonar Animation
	 *
	 * @export
	 * @param {any} obj
	 * @param {IShakePresetParams} settings
	 * @returns {ISequence}
	 */
	shake: (obj: any, settings?: IShakePresetParams | any) => ITween;
}

export function get(): IPlugin {
	return new FatinaPluginPreset();
}

export class FatinaPluginPreset implements IPlugin {
	public readonly name = 'fatina-plugin-preset';
	private initialized = false;

	public init(fatina: Fatina) {
		if (this.initialized) {
			throw new Error('Try to init the plugin twice : ' + name);
		}

		if (fatina === undefined || fatina === null || fatina.plugin === null) {
			throw new Error('Try to init the plugin without fatina : ' + name);
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
