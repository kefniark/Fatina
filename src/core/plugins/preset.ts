import { Fatina } from '../../fatina';
import { ISequence } from '../interfaces/ISequence';
import { ITween } from '../interfaces/ITween';

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

export interface ISonarPresetParams {
	alpha: string;
	scaleX: string;
	scaleY: string;
	amplitude: number;
	duration: number;
}

export interface IScalePresetParams {
	scaleX: string;
	scaleY: string;
	amplitude: number;
	duration: number;
	bounce: number;
	friction: number;
	sinX: number;
}

export interface IShakePresetParams {
	posX: string;
	posY: string;
	amplitude: number;
	duration: number;
	bounce: number;
	friction: number;
}

export interface IPulsePresetParams {
	alpha: string;
	duration: number;
}
