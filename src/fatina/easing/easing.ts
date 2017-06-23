/**
 * List of easing method
 *
 * Mostly based on http://easings.net/
 */
import { EasingType } from './easingType';

const PI = Math.PI;
const PI_OVER_TWO = Math.PI / 2;
const BACK = 1.70158;

const easingByType: ((t: number) => number)[] = [];
const easingByName: { [id: string]: (t: number) => number } = {};

// Linear
easingByType[EasingType.Linear] = easingByName['linear'] = (t: number): number => {
	return t;
};

// Quad
easingByType[EasingType.InQuad] = easingByName['inQuad'] = (t: number): number => {
	return t * t;
};

easingByType[EasingType.OutQuad] = easingByName['outQuad'] = (t: number): number => {
	return 2 * t - t * t;
};

easingByType[EasingType.InOutQuad] = easingByName['inOutQuad'] = (t: number): number => {
	if (t < 0.5) {
		return 2 * t * t;
	} else {
		return 2 * (2 * t - t * t) - 1;
	}
};

// Cubic
easingByType[EasingType.InCubic] = easingByName['inCubic'] = (t: number): number => {
	return t * t * t;
};

easingByType[EasingType.OutCubic] = easingByName['outCubic'] = (t: number): number => {
	return 3 * t - 3 * t * t + t * t * t;
};

easingByType[EasingType.InOutCubic] = easingByName['inOutCubic'] = (t: number): number => {
	if (t < 0.5) {
		return 4 * t * t * t;
	} else {
		return 4 * (3 * t - 3 * t * t + t * t * t) - 3;
	}
};

// Quart
easingByType[EasingType.InQuart] = easingByName['inQuart'] = (t: number): number => {
	return t * t * t * t;
};

easingByType[EasingType.OutQuart] = easingByName['outQuart'] = (t: number): number => {
	const t2 = t * t;
	return 4 * t - 6 * t2 + 4 * t2 * t - t2 * t2;
};

easingByType[EasingType.InOutQuart] = easingByName['inOutQuart'] = (t: number): number => {
	if (t < 0.5) {
		return 8 * t * t * t * t;
	} else {
		const t2 = t * t;
		return 8 * (4 * t - 6 * t2 + 4 * t2 * t - t2 * t2) - 7;
	}
};

// Sine
easingByType[EasingType.InSine] = easingByName['inSine'] = (t: number): number => {
	if (t === 1) {
		return 1;
	}
	return 1 - Math.cos(PI_OVER_TWO * t);
};

easingByType[EasingType.OutSine] = easingByName['outSine'] = (t: number): number => {
	return Math.sin(PI_OVER_TWO * t);
};

easingByType[EasingType.InOutSine] = easingByName['inOutSine'] = (t: number): number => {
	if (t < 0.5) {
		return (1 - Math.cos(PI * t)) / 2;
	} else {
		return (1 + Math.sin(PI * (t - 0.5))) / 2;
	}
};

// Circular
easingByType[EasingType.InCirc] = easingByName['inCirc'] = (t: number): number => {
	return 1 - Math.sqrt(1 - Math.pow(t, 2));
};

easingByType[EasingType.OutCirc] = easingByName['outCirc'] = (t: number): number => {
	return Math.sqrt(1 - Math.pow(1 - t, 2));
};

easingByType[EasingType.InOutCirc] = easingByName['inOutCirc'] = (t: number): number => {
	if (t < 0.5) {
		return (1 - Math.sqrt(1 - 4 * t * t)) / 2;
	} else {
		return (1 + Math.sqrt(-3 + 8 * t - 4 * t * t)) / 2;
	}
};

// Quint
easingByType[EasingType.InQuint] = easingByName['inQuint'] = (t: number): number => {
	return t * t * t * t * t;
};

easingByType[EasingType.OutQuint] = easingByName['outQuint'] = (t: number): number => {
	return --t * t * t * t * t + 1;
};

easingByType[EasingType.InOutQuint] = easingByName['inOutQuint'] = (t: number): number => {
	t *= 2;
	if (t < 1) {
		return 0.5 * t * t * t * t * t;
	}
	return 0.5 * ((t -= 2) * t * t * t * t + 2);
};

// Exponential
easingByType[EasingType.InExponential] = easingByName['inExponential'] = (t: number): number => {
	if (t === 1) {
		return 1;
	}
	return t === 0 ? 0 : Math.pow(1024, t - 1);
};

easingByType[EasingType.OutExponential] = easingByName['outExponential'] = (t: number): number => {
	return t === 1 ? 1 : 1 - Math.pow(2, - 10 * t);
};

easingByType[EasingType.InOutExponential] = easingByName['inOutExponential'] = (t: number): number => {
	if (t === 0) {
		return 0;
	}
	if (t === 1) {
		return 1;
	}
	t *= 2;
	if (t < 1) {
		return 0.5 * Math.pow(1024, t - 1);
	}
	return 0.5 * (- Math.pow(2, - 10 * (t - 1)) + 2);
};

// Elastic
easingByType[EasingType.InElastic] = easingByName['inElastic'] = (t: number): number => {
	if (t === 0) {
		return 0;
	}
	return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
};

easingByType[EasingType.OutElastic] = easingByName['outElastic'] = (t: number): number => {
	if (t === 1) {
		return 1;
	}
	return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
};

easingByType[EasingType.InOutElastic] = easingByName['inOutElastic'] = (t: number): number => {
	if (t === 0) {
		return 0;
	}
	if (t === 1) {
		return 1;
	}
	t *= 2;
	if (t < 1) {
		return -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
	}

	return 0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1;
};

// Back
easingByType[EasingType.InBack] = easingByName['inBack'] = (t: number): number => {
	const s = BACK;
	return t === 1 ? 1 : t * t * ((s + 1) * t - s);

};

easingByType[EasingType.OutBack] = easingByName['outBack'] = (t: number): number => {
	const s = BACK;
	return t === 0 ? 0 : --t * t * ((s + 1) * t + s) + 1;
};

easingByType[EasingType.InOutBack] = easingByName['inOutBack'] = (t: number): number => {
	const s = BACK * 1.525;
	t *= 2;
	if (t < 1) {
		return 0.5 * (t * t * ((s + 1) * t - s));
	}
	return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
};

// Bounce
easingByType[EasingType.OutBounce] = easingByName['outBounce'] = (t: number): number => {
	if (t < (1 / 2.75)) {
		return 7.5625 * t * t;
	} else if (t < (2 / 2.75)) {
		return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
	} else if (t < (2.5 / 2.75)) {
		return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
	} else {
		return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
	}
};

easingByType[EasingType.InBounce] = easingByName['inBounce'] = (t: number): number => {
	return 1 - easingByType[EasingType.OutBounce](1 - t);
};

easingByType[EasingType.InOutBounce] = easingByName['inOutBounce'] = (t: number): number => {
	if (t < 0.5) {
		return easingByType[EasingType.InBounce](t * 2) * 0.5;
	}
	return easingByType[EasingType.OutBounce](t * 2 - 1) * 0.5 + 0.5;
};

// Export both array
export let easeTypes = easingByType;
export let easeNames = easingByName;
