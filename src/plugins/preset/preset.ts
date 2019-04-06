import { IPulsePresetParams, IScalePresetParams, IShakePresetParams, ISonarPresetParams } from '../../core/plugins/preset';
import { easeNames } from '../../easing/easing';
import { Fatina } from '../../fatina';
import { EasingType } from '../../index';
import { getData, getProp, getRoot } from '../helper';

/**
 * Sonar Preset
 *
 * @ignore
 * @export
 * @param {Fatina} fatina
 * @param {*} obj
 * @param {ISonarPresetParams} [settings]
 * @returns
 */
export function sonarPreset(fatina: Fatina, obj: any, settings?: ISonarPresetParams) {
	const defaults = {
		alpha: 'alpha',
		scaleX: 'scale.x',
		scaleY: 'scale.y',
		amplitude: 4,
		duration: 2000
	};
	const pa = { ...defaults, ...(settings || {}) } as ISonarPresetParams;
	const rs = getRoot(obj, pa.scaleX);
	const ra = getRoot(obj, pa.alpha);
	const sx = getProp(pa.scaleX);
	const sy = getProp(pa.scaleY);
	const alpha = getProp(pa.alpha);
	const src = { x: rs[sx], y: rs[sy] };
	const p = easeNames[EasingType.OutCubic];

	return fatina.tween({})
		.to({}, pa.duration)
		.onUpdate((_dt, progress) => {
			ra[alpha] = 1 - easeNames[EasingType.InSine](progress);
			rs[sx] = src.x + pa.amplitude * p(progress);
			rs[sy] = src.y + pa.amplitude * p(progress);
		})
		.onKilled(() => {
			ra[alpha] = 1;
			rs[sx] = src.x;
			rs[sy] = src.y;
		});
}

/**
 * Pulse Preset
 *
 * @ignore
 * @export
 * @param {Fatina} fatina
 * @param {*} obj
 * @param {IPulsePresetParams} [settings]
 * @returns
 */
export function pulsePreset(fatina: Fatina, obj: any, settings?: IPulsePresetParams) {
	const defaults = {
		alpha: 'alpha',
		duration: 2000
	};
	const pa = { ...defaults, ...(settings || {}) } as IPulsePresetParams;
	const rootAlpha = getRoot(obj, pa.alpha);
	return fatina.tween(rootAlpha)
		.to(getData(pa.alpha, 0), pa.duration / 2)
		.setEasing(EasingType.InOutQuad)
		.toSequence()
		.append(
			fatina.tween(rootAlpha)
			.to(getData(pa.alpha, 1), pa.duration / 2)
			.setEasing(EasingType.InOutQuad)
		)
		.onKilled(() => rootAlpha[getProp(pa.alpha)] = 1);
}

/**
 * Scale Preset
 *
 * @ignore
 * @export
 * @param {Fatina} fatina
 * @param {*} obj
 * @param {IScalePresetParams} [settings]
 * @returns
 */
export function scalePreset(fatina: Fatina, obj: any, settings?: IScalePresetParams) {
	const defaults = {
		scaleX: 'scale.x',
		scaleY: 'scale.y',
		amplitude: 0.5,
		duration: 2000,
		bounce: 5,
		friction: 2,
		sinX: 0
	};
	const pa = { ...defaults, ...(settings || {}) } as IScalePresetParams;
	const root = getRoot(obj, pa.scaleX);
	const x = getProp(pa.scaleX);
	const y = getProp(pa.scaleY);
	const src = { x: root[x], y: root[y] };
	return fatina.tween({}).to({}, pa.duration)
		.setEasing(EasingType.InOutCubic)
		.onUpdate((_dt, progress) => {
			const friction = Math.pow(1 - progress, pa.friction);
			const p = (progress * pa.bounce) % pa.duration;
			root[x] = src.x + Math.sin(pa.sinX + p * Math.PI * 2) * pa.amplitude * friction;
			root[y] = src.y + Math.sin(p * Math.PI * 2) * pa.amplitude * friction;
		})
		.onKilled(() => {
			root[x] = src.x;
			root[y] = src.y;
		});
}

/**
 * Wobble Preset
 *
 * @ignore
 * @export
 * @param {Fatina} fatina
 * @param {*} obj
 * @param {IScalePresetParams} [settings]
 * @returns
 */
export function wobblePreset(fatina: Fatina, obj: any, settings?: IScalePresetParams) {
	const defaults = { sinX: Math.PI };
	return scalePreset(fatina, obj, { ...defaults, ...(settings || {}) } as IScalePresetParams);
}

/**
 * Shake Preset
 *
 * @ignore
 * @export
 * @param {Fatina} fatina
 * @param {*} obj
 * @param {IShakePresetParams} [settings]
 * @returns
 */
export function shakePreset(fatina: Fatina, obj: any, settings?: IShakePresetParams) {
	const defaults = {
		posX: 'position.x',
		posY: 'position.y',
		amplitude: 1.5,
		duration: 2000,
		bounce: 10,
		friction: 2
	};
	const pa = { ...defaults, ...(settings || {}) } as IShakePresetParams;
	const root = getRoot(obj, pa.posX);
	const x = getProp(pa.posX);
	const y = getProp(pa.posY);
	const src = { x: root[x], y: root[y] };
	const rnd = { x: 0.5 + Math.random(), y: 0.5 + Math.random() };
	return fatina.tween({})
		.to({}, pa.duration)
		.onUpdate((_dt, progress) => {
			const friction = Math.pow(1 - progress, pa.friction);
			const p = (progress * pa.bounce) % pa.duration;
			root[x] = src.x + Math.sin(Math.PI + (p + rnd.x) * Math.PI * 2) * pa.amplitude * friction;
			root[y] = src.y + Math.sin((p + rnd.y) * Math.PI * 2) * pa.amplitude * friction;
		})
		.onKilled(() => {
			root[x] = src.x;
			root[y] = src.y;
		});
}
