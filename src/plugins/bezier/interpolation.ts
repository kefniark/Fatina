import { Fatina } from '../../fatina';
import { getProp, getRoot } from '../helper';
import { BezierType, IArcParams, ICircle, ICurveParams, IPathParams, IVector2, PathType } from './core';

const e: { [id: string]: (t: number, start: number, ctr: number[], dest: number) => number } = {};

/***
 * Cubic interpolation (2 control point)
 * https://en.wikipedia.org/wiki/B%C3%A9zier_curve
 *
 * @param {number} t
 * @param {number} start
 * @param {number[]} ctr
 * @param {number} dest
 */
e.cubic = (t: number, start: number, ctr: number[], dest: number) => {
	const t2 = 1 - t;
	return t2 * t2 * t2 * start + t * (3 * t2 * t2 * ctr[0] + t * (3 * t2 * ctr[1] + t * dest));
};

/***
 * Quadratic interpolation (1 control point)
 *
 * @param {number} t
 * @param {number} start
 * @param {number[]} ctr
 * @param {number} dest
 */
e.quadratic = (t: number, start: number, ctr: number[], dest: number) => {
	const t2 = 1 - t;
	return t2 * t2 * start + t * (2 * t2 * ctr[0] + t * dest);
};

/***
 * Catmull interpolation (2 control point)
 * unlike bezier, control points are before and after, not between start and dest
 * ctr[0] -> start -> dest -> ctr[1]
 * https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline
 *
 * @param {number} t
 * @param {number} start
 * @param {number[]} ctr
 * @param {number} dest
 */
e.catmull = (t: number, start: number, ctr: number[], dest: number) => {
	const t2 = t * t;
	const t3 = t * t * t;

	const f1 = -0.5 * t3 + t2 - 0.5 * t;
	const f2 = 1.5 * t3 - 2.5 * t2 + 1.0;
	const f3 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
	const f4 = 0.5 * t3 - 0.5 * t2;

	return ctr[0] * f1 + start * f2 + dest * f3 + ctr[1] * f4;
};

export function curve(fatina: Fatina, obj: any, settings?: ICurveParams) {
	const defaults = {
		posX: 'position.x',
		posY: 'position.y',
		rot: 'rotation',
		rotAdd: Math.PI / 2,
		autoRotate: true,
		from: { x: 0, y: 0 },
		ctr1: { x: 0, y: 0 },
		ctr2: { x: 0, y: 0 },
		to: { x: 0, y: 0 },
		duration: 2000,
		method: BezierType.Cubic
	} as ICurveParams;
	const pa = { ...defaults, ...(settings || {}) } as ICurveParams;
	const root = getRoot(obj, pa.posX);
	const method = e[pa.method];
	const ctrlX = [pa.ctr1.x, pa.ctr2.x];
	const ctrlY = [pa.ctr1.y, pa.ctr2.y];
	let last = { x: 0, y: 0 };
	return fatina.tween({})
		.to({}, pa.duration)
		.onStart(() => {
			if (pa.from.x === 0 && pa.from.y === 0) {
				pa.from = { x: root[getProp(pa.posX)], y: root[getProp(pa.posY)] };
			}
		})
		.onUpdate((_dt, progress) => {
			root[getProp(pa.posX)] = method(progress, pa.from.x, ctrlX, pa.to.x);
			root[getProp(pa.posY)] = method(progress, pa.from.y, ctrlY, pa.to.y);
			if (pa.autoRotate) {
				const current = { x: root[getProp(pa.posX)] - last.x, y: root[getProp(pa.posY)] - last.y };
				obj[pa.rot] = Math.atan2(current.y, current.x) + pa.rotAdd;
				last = { x: root[getProp(pa.posX)], y: root[getProp(pa.posY)] };
			}
		})
		.onKilled(() => {
			root[getProp(pa.posX)] = pa.to.x;
			root[getProp(pa.posY)] = pa.to.y;
		});
}

export function path(fatina: Fatina, obj: any, settings?: IPathParams) {
	const defaults = {
		posX: 'position.x',
		posY: 'position.y',
		points: [],
		duration: 2000,
		method: PathType.Catmull
	} as IPathParams;
	const pa = { ...defaults, ...(settings || {}) } as IPathParams;
	const root = getRoot(obj, pa.posX);
	const from = { x: root[getProp(pa.posX)], y: root[getProp(pa.posY)] };

	let dist = 0;
	for (let j = 0; j < pa.points.length; j++) {
		const a = (j === 0) ? from : pa.points[j - 1];
		const b = pa.points[j];
		dist += distance(a, b);
	}

	const sequence = fatina.sequence();
	for (let i = 0; i < pa.points.length; i++) {
		const ptStart = (i < 1) ? from : pa.points[i - 1];
		const ptTo = pa.points[i];
		const dur = pa.duration * distance(ptStart, ptTo) / dist;
		switch (pa.method) {
			case PathType.Linear:
				sequence.append(fatina.tween(root).to({ x: pa.points[i].x, y: pa.points[i].y }, dur));
				break;
			case PathType.Catmull:
				sequence.append(curve(fatina, obj, {
					ctr1: (i < 2) ? from : pa.points[i - 2],
					ctr2: (i >= pa.points.length - 1) ? pa.points[pa.points.length - 1] : pa.points[i + 1],
					from: ptStart,
					to: ptTo,
					method: BezierType.Catmull,
					duration: dur
				} as ICurveParams));
				break;
		}
	}
	sequence.onKilled(() => {
		root[getProp(pa.posX)] = pa.points[pa.points.length - 1].x;
		root[getProp(pa.posY)] = pa.points[pa.points.length - 1].y;
	});
	return sequence;
}

export function arc(fatina: Fatina, obj: any, settings?: IArcParams) {
	const defaults = {
		posX: 'position.x',
		posY: 'position.y',
		rot: 'rotation',
		rotAdd: Math.PI / 2,
		autoRotate: true,
		ctr1: { x: 0, y: 0 },
		to: { x: 0, y: 0 },
		duration: 2000
	} as IArcParams;
	const pa = { ...defaults, ...(settings || {}) } as IArcParams;
	const root = getRoot(obj, pa.posX);
	const from = { x: root[getProp(pa.posX)], y: root[getProp(pa.posY)] };
	const circle = circle3Points(from, pa.ctr1, pa.to);
	const center = { x: circle.x, y: circle.y };
	let last = { x: 0, y: 0 };

	const a = getAngle(center, from);
	const b = getAngle(center, pa.ctr1);
	let c = getAngle(center, pa.to);

	const rot = getAbs(b) > getAbs(a);
	const inBetween = between(a, b, c);

	if (!inBetween) {
		c += (rot) ? Math.PI * 2 : - Math.PI * 2;
	}

	return fatina.tween({})
		.to({}, pa.duration)
		.onUpdate((_dt, progress) => {
			const ang = (c - a) * progress + a;
			root[getProp(pa.posX)] = circle.x + circle.r * Math.cos(ang);
			root[getProp(pa.posY)] = circle.y + circle.r * Math.sin(ang);
			if (pa.autoRotate) {
				const current = { x: root[getProp(pa.posX)] - last.x, y: root[getProp(pa.posY)] - last.y };
				obj[pa.rot] = Math.atan2(current.y, current.x) + pa.rotAdd;
				last = { x: root[getProp(pa.posX)], y: root[getProp(pa.posY)] };
			}
		})
		.onKilled(() => {
			root[getProp(pa.posX)] = pa.to.x;
			root[getProp(pa.posY)] = pa.to.y;
		});
}

//
// Helpers
//

function distance(a: IVector2, b: IVector2) {
	return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}

function getAngle(a: IVector2, b: IVector2) {
	const point = { x: b.x - a.x, y: b.y - a.y };
	return Math.atan2(point.y, point.x);
}

function getAbs(angle: number) {
	return (angle + 2 * Math.PI) % (Math.PI * 2);
}

function between(a: number, b: number, c: number) {
	return (b > a && c > b) || (b > c && a > b);
}

/**
 * Based on http://paulbourke.net/geometry/circlesphere/
 *
 * @param {IVector2} a
 * @param {IVector2} b
 * @param {IVector2} c
 * @returns {ICircle}
 */
function circle3Points(a: IVector2, b: IVector2, c: IVector2): ICircle {
	const d1 = { x: b.y - a.y, y: a.x - b.x } as IVector2;
	const d2 = { x: c.y - a.y, y: a.x - c.x } as IVector2;
	const k = d2.x * d1.y - d2.y * d1.x;
	const s1 = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } as IVector2;
	const s2 = { x: (a.x + c.x) / 2, y: (a.y + c.y) / 2 } as IVector2;
	const l = d1.x * (s2.y - s1.y) - d1.y * (s2.x - s1.x);
	const m = l / k;
	const center = { x: s2.x + m * d2.x, y: s2.y + m * d2.y } as IVector2;
	const dx = center.x - a.x;
	const dy = center.y - a.y;
	const radius = Math.sqrt(dx * dx + dy * dy);
	return { x: center.x, y: center.y, r: radius };
}
