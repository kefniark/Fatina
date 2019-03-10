import { Fatina } from '../fatina';
import { getProp, getRoot } from './helper';

/**
 * Bezier curve calculation method
 *
 * @param {number} t
 * @param {number} start
 * @param {number} ctr1
 * @param {number} ctr2
 * @param {number} dest
 * @returns
 */
function cubicBezier(t: number, start: number, ctr1: number, ctr2: number, dest: number) {
	const t2 = t * t;
	const t3 = t2 * t;
	return start +
		(-start * 3 + t * (3 * start - start * t)) * t +
		(3 * ctr1 + t * (-6 * ctr1 + ctr1 * 3 * t)) * t +
		(ctr2 * 3 - ctr2 * 3 * t) * t2 +
		dest * t3;
}

export function curve(fatina: Fatina, obj: any, settings?: any) {
	const defaults = {
		posX: 'position.x',
		posY: 'position.y',
		ctr1: { x: 0, y: 0 },
		ctr2: { x: 0, y: 0 },
		to: { x: 0, y: 0 },
		duration: 2000
	};
	const pa = { ...defaults, ...(settings || {}) };
	const root = getRoot(obj, pa.posX);
	const from = { x: root[getProp(pa.posX)], y: root[getProp(pa.posY)] };
	return fatina.tween({})
		.to({}, pa.duration)
		.onUpdate((_dt, progress) => {
			root[getProp(pa.posX)] = cubicBezier(progress, from.x, pa.ctr1.x, pa.ctr2.x, pa.to.x);
			root[getProp(pa.posY)] = cubicBezier(progress, from.y, pa.ctr1.y, pa.ctr2.y, pa.to.y);
		})
		.onKilled(() => {
			root[getProp(pa.posX)] = pa.to.x;
			root[getProp(pa.posY)] = pa.to.y;
		});
}
