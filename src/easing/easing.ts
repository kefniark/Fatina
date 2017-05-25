import { EasingType } from '../core/enum/easingType';

/**
 * List of easing method
 *
 * Mostly based on http://easings.net/
 */
let PI = Math.PI;
let PI_OVER_TWO = Math.PI / 2;

let easingByType: ((t: number, args?: any) => number)[] = [];
let easingByName: { [id: string]: (t: number, args?: any) => number } = {};

// Linear
easingByType[EasingType.Linear] = easingByName['linear'] = function Linear(t: number): number {
	return t;
}

// Quad
easingByType[EasingType.InQuad] = easingByName['inQuad'] = function InQuad(t: number): number {
	return t * t;
}

easingByType[EasingType.OutQuad] = easingByName['outQuad'] = function OutQuad(t: number): number {
	return 2 * t - t * t;
}

easingByType[EasingType.InOutQuad] = easingByName['inOutQuad'] = function InOutQuad(t: number): number {
	if (t < 0.5) {
		return 2 * t * t;
	} else {
		return 2 * (2 * t - t * t) - 1;
	}
}

// Cubic
easingByType[EasingType.InCubic] = easingByName['inCubic'] = function InCubic(t: number) {
	return t * t * t;
}

easingByType[EasingType.OutCubic] = easingByName['outCubic'] = function OutCubic(t: number) {
	return 3 * t - 3 * t * t + t * t * t;
}

easingByType[EasingType.InOutCubic] = easingByName['inOutCubic'] = function InOutCubic(t: number) {
	if (t < 0.5) {
		return 4 * t * t * t;
	} else {
		return 4 * (3 * t - 3 * t * t + t * t * t) - 3;
	}
}

// Quart
easingByType[EasingType.InQuart] = easingByName['inQuart'] = function InQuart(t: number) {
	return t * t * t * t;
}

easingByType[EasingType.OutQuart] = easingByName['outQuart'] = function OutQuart(t: number) {
	let t2 = t * t;
	return 4 * t - 6 * t2 + 4 * t2 * t - t2 * t2;
}

easingByType[EasingType.InOutQuart] = easingByName['inOutQuart'] = function InOutQuart(t: number) {
	if (t < 0.5) {
		return 8 * t * t * t * t;
	} else {
		let t2 = t * t;
		return 8 * (4 * t - 6 * t2 + 4 * t2 * t - t2 * t2) - 7;
	}
}

// Sine
easingByType[EasingType.InSine] = easingByName['inSine'] = function InSine(t: number) {
	if (t === 1) {
		return 1;
	}
	return 1 - Math.cos(PI_OVER_TWO * t);
}

easingByType[EasingType.OutSine] = easingByName['outSine'] = function OutSine(t: number) {
	return Math.sin(PI_OVER_TWO * t);
}

easingByType[EasingType.InOutSine] = easingByName['inOutSine'] = function InOutSine(t: number) {
	if (t < 0.5) {
		return (1 - Math.cos(PI * t)) / 2;
	} else {
		return (1 + Math.sin(PI * (t - 0.5))) / 2;
	}
}

// Circular
easingByType[EasingType.InCirc] = easingByName['inCirc'] = function InCirc(t: number) {
	return 1 - Math.sqrt(1 - Math.pow(t, 2));
}

easingByType[EasingType.OutCirc] = easingByName['outCirc'] = function OutCirc(t: number) {
	return Math.sqrt(1 - Math.pow(1 - t, 2));
}

easingByType[EasingType.InOutCirc] = easingByName['inOutCirc'] = function InOutCirc(t: number) {
	if (t < 0.5) {
		return (1 - Math.sqrt(1 - 4 * t * t)) / 2;
	} else {
		return (1 + Math.sqrt(-3 + 8 * t - 4 * t * t)) / 2;
	}
}

// Export both array
export let easeTypes = easingByType;
export let easeNames = easingByName;
