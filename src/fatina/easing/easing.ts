/**
 * List of easing method
 *
 * Mostly based on http://easings.net/
 */
import { EasingType } from './easingType';

const PI = Math.PI;
const PI_OVER_TWO = Math.PI / 2;
const BACK = 1.70158;
const easingByName: { [id: string]: (t: number) => number } = {};

// Linear
easingByName[EasingType.Linear] = (t: number): number => {
	return t;
};

// Quad
easingByName[EasingType.InQuad] = (t: number): number => {
	return t * t;
};

easingByName[EasingType.OutQuad] = (t: number): number => {
	return 2 * t - t * t;
};

easingByName[EasingType.InOutQuad] = (t: number): number => {
	if (t < 0.5) {
		return 2 * t * t;
	} else {
		return 2 * (2 * t - t * t) - 1;
	}
};

// Cubic
easingByName[EasingType.InCubic] = (t: number): number => {
	return t * t * t;
};

easingByName[EasingType.OutCubic] = (t: number): number => {
	return 3 * t - 3 * t * t + t * t * t;
};

easingByName[EasingType.InOutCubic] = (t: number): number => {
	if (t < 0.5) {
		return 4 * t * t * t;
	} else {
		return 4 * (3 * t - 3 * t * t + t * t * t) - 3;
	}
};

// Quart
easingByName[EasingType.InQuart] = (t: number): number => {
	return t * t * t * t;
};

easingByName[EasingType.OutQuart] = (t: number): number => {
	const t2 = t * t;
	return 4 * t - 6 * t2 + 4 * t2 * t - t2 * t2;
};

easingByName[EasingType.InOutQuart] = (t: number): number => {
	if (t < 0.5) {
		return 8 * t * t * t * t;
	} else {
		const t2 = t * t;
		return 8 * (4 * t - 6 * t2 + 4 * t2 * t - t2 * t2) - 7;
	}
};

// Sine
easingByName[EasingType.InSine] = (t: number): number => {
	if (t === 1) {
		return 1;
	}
	return 1 - Math.cos(PI_OVER_TWO * t);
};

easingByName[EasingType.OutSine] = (t: number): number => {
	return Math.sin(PI_OVER_TWO * t);
};

easingByName[EasingType.InOutSine] = (t: number): number => {
	if (t < 0.5) {
		return (1 - Math.cos(PI * t)) / 2;
	} else {
		return (1 + Math.sin(PI * (t - 0.5))) / 2;
	}
};

// Circular
easingByName[EasingType.InCirc] = (t: number): number => {
	return 1 - Math.sqrt(1 - Math.pow(t, 2));
};

easingByName[EasingType.OutCirc] = (t: number): number => {
	return Math.sqrt(1 - Math.pow(1 - t, 2));
};

easingByName[EasingType.InOutCirc] = (t: number): number => {
	if (t < 0.5) {
		return (1 - Math.sqrt(1 - 4 * t * t)) / 2;
	} else {
		return (1 + Math.sqrt(-3 + 8 * t - 4 * t * t)) / 2;
	}
};

// Quint
easingByName[EasingType.InQuint] = (t: number): number => {
	return t * t * t * t * t;
};

easingByName[EasingType.OutQuint] = (t: number): number => {
	return --t * t * t * t * t + 1;
};

easingByName[EasingType.InOutQuint] = (t: number): number => {
	t *= 2;
	if (t < 1) {
		return 0.5 * t * t * t * t * t;
	}
	return 0.5 * ((t -= 2) * t * t * t * t + 2);
};

// Exponential
easingByName[EasingType.InExponential] = (t: number): number => {
	if (t === 1) {
		return 1;
	}
	return t === 0 ? 0 : Math.pow(1024, t - 1);
};

easingByName[EasingType.OutExponential] = (t: number): number => {
	return t === 1 ? 1 : 1 - Math.pow(2, - 10 * t);
};

easingByName[EasingType.InOutExponential] = (t: number): number => {
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
easingByName[EasingType.InElastic] = (t: number): number => {
	if (t === 0) {
		return 0;
	}
	return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
};

easingByName[EasingType.OutElastic] = (t: number): number => {
	if (t === 1) {
		return 1;
	}
	return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
};

easingByName[EasingType.InOutElastic] = (t: number): number => {
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
easingByName[EasingType.InBack] = (t: number): number => {
	const s = BACK;
	return t === 1 ? 1 : t * t * ((s + 1) * t - s);

};

easingByName[EasingType.OutBack] = (t: number): number => {
	const s = BACK;
	return t === 0 ? 0 : --t * t * ((s + 1) * t + s) + 1;
};

easingByName[EasingType.InOutBack] = (t: number): number => {
	const s = BACK * 1.525;
	t *= 2;
	if (t < 1) {
		return 0.5 * (t * t * ((s + 1) * t - s));
	}
	return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
};

// Bounce
easingByName[EasingType.OutBounce] = (t: number): number => {
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

easingByName[EasingType.InBounce] = (t: number): number => {
	return 1 - easingByName[EasingType.OutBounce](1 - t);
};

easingByName[EasingType.InOutBounce] = (t: number): number => {
	if (t < 0.5) {
		return easingByName[EasingType.InBounce](t * 2) * 0.5;
	}
	return easingByName[EasingType.OutBounce](t * 2 - 1) * 0.5 + 0.5;
};

export let easeNames = easingByName;
