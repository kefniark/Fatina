/**
 * List of easing method
 *
 * Mostly based on http://easings.net/
 */
// tslint:disable:no-parameter-reassignment
/**
 * @ignore
 * @private
 * @const
 * @readonly
 */
const PI = Math.PI;
/**
 * @ignore
 * @private
 * @const
 * @readonly
 */
const PI_OVER_TWO = Math.PI / 2;
/**
 * @ignore
 * @private
 * @const
 * @readonly
 */
const BACK = 1.70158;
/**
 * @ignore
 * @private
 * @const
 * @readonly
 */
const e: { [id: string]: (t: number) => number } = {};

// Linear
e.linear = (t: number): number => {
	return t;
};

// Quad
e.inQuad = (t: number): number => {
	return t * t;
};

e.outQuad = (t: number): number => {
	return 2 * t - t * t;
};

e.inOutQuad = (t: number): number => {
	if (t < 0.5) {
		return 2 * t * t;
	} else {
		return 2 * (2 * t - t * t) - 1;
	}
};

// Cubic
e.inCubic = (t: number): number => {
	return t * t * t;
};

e.outCubic = (t: number): number => {
	return 3 * t - 3 * t * t + t * t * t;
};

e.inOutCubic = (t: number): number => {
	if (t < 0.5) {
		return 4 * t * t * t;
	} else {
		return 4 * (3 * t - 3 * t * t + t * t * t) - 3;
	}
};

// Quart
e.inQuart = (t: number): number => {
	return t * t * t * t;
};

e.outQuart = (t: number): number => {
	const t2 = t * t;
	return 4 * t - 6 * t2 + 4 * t2 * t - t2 * t2;
};

e.inOutQuart = (t: number): number => {
	if (t < 0.5) {
		return 8 * t * t * t * t;
	} else {
		const t2 = t * t;
		return 8 * (4 * t - 6 * t2 + 4 * t2 * t - t2 * t2) - 7;
	}
};

// Sine
e.inSine = (t: number): number => {
	if (t === 1) {
		return 1;
	}
	return 1 - Math.cos(PI_OVER_TWO * t);
};

e.outSine = (t: number): number => {
	return Math.sin(PI_OVER_TWO * t);
};

e.inOutSine = (t: number): number => {
	if (t < 0.5) {
		return (1 - Math.cos(PI * t)) / 2;
	} else {
		return (1 + Math.sin(PI * (t - 0.5))) / 2;
	}
};

// Circular
e.inCirc = (t: number): number => {
	return 1 - Math.sqrt(1 - Math.pow(t, 2));
};

e.outCirc = (t: number): number => {
	return Math.sqrt(1 - Math.pow(1 - t, 2));
};

e.inOutCirc = (t: number): number => {
	if (t < 0.5) {
		return (1 - Math.sqrt(1 - 4 * t * t)) / 2;
	} else {
		return (1 + Math.sqrt(-3 + 8 * t - 4 * t * t)) / 2;
	}
};

// Quint
e.inQuint = (t: number): number => {
	return t * t * t * t * t;
};

e.outQuint = (t: number): number => {
	return --t * t * t * t * t + 1;
};

e.InOutQuint = (t: number): number => {
	t *= 2;
	if (t < 1) {
		return 0.5 * t * t * t * t * t;
	}
	return 0.5 * ((t -= 2) * t * t * t * t + 2);
};

// Exponential
e.inExponential = (t: number): number => {
	if (t === 1) {
		return 1;
	}
	return t === 0 ? 0 : Math.pow(1024, t - 1);
};

e.outExponential = (t: number): number => {
	return t === 1 ? 1 : 1 - Math.pow(2, - 10 * t);
};

e.inOutExponential = (t: number): number => {
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
e.inElastic = (t: number): number => {
	if (t === 0) {
		return 0;
	}
	return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
};

e.outElastic = (t: number): number => {
	if (t === 1) {
		return 1;
	}
	return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
};

e.inOutElastic = (t: number): number => {
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
e.inBack = (t: number): number => {
	const s = BACK;
	if (t === 0) {
		return 0;
	}
	return t === 1 ? 1 : t * t * ((s + 1) * t - s);
};

e.outBack = (t: number): number => {
	const s = BACK;
	return t === 0 ? 0 : --t * t * ((s + 1) * t + s) + 1;
};

e.inOutBack = (t: number): number => {
	const s = BACK * 1.525;
	t *= 2;
	if (t === 0) {
		return 0;
	}
	if (t < 1) {
		return 0.5 * (t * t * ((s + 1) * t - s));
	}
	return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
};

// Bounce
e.outBounce = (t: number): number => {
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

e.inBounce = (t: number): number => {
	return 1 - e.outBounce(1 - t);
};

e.inOutBounce = (t: number): number => {
	if (t < 0.5) {
		return e.inBounce(t * 2) * 0.5;
	}
	return e.outBounce(t * 2 - 1) * 0.5 + 0.5;
};

export const easeNames = e;
