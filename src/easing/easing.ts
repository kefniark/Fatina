/**
 * List of easing method
 * Mostly based on http://easings.net/
 */

// Math constants (for readability)
let PI          = Math.PI;
let PI_OVER_TWO = Math.PI / 2;
// let TWO_PI      = Math.PI * 2;
// let EXP         = 2.718281828;

// Linear
export function Linear(t: number): number {
	return t;
}

// Quad
export function InQuad(t: number): number {
	return t * t;
}

export function OutQuad(t: number): number {
	return 2 * t - t * t;
}

export function InOutQuad(t: number): number {
	if (t < 0.5) {
		return 2 * t * t;
	} else {
		return 2 * (2 * t - t * t) - 1;
	}
}

// Cubic
export function InCubic(t: number) {
	return t * t * t;
}

export function OutCubic(t: number) {
	return 3 * t - 3 * t * t + t * t * t;
}

export function InOutCubic(t: number) {
	if (t < 0.5) {
		return 4 * t * t * t;
	} else {
		return 4 * (3 * t - 3 * t * t + t * t * t) - 3;
	}
}

// Quart
export function InQuart(t: number) {
	return t * t * t * t;
}

export function OutQuart(t: number) {
	let t2 = t * t;
	return 4 * t - 6 * t2 + 4 * t2 * t - t2 * t2;
}

export function InOutQuart(t: number) {
	if (t < 0.5) {
		return 8 * t * t * t * t;
	} else {
		let t2 = t * t;
		return 8 * (4 * t - 6 * t2 + 4 * t2 * t - t2 * t2) - 7;
	}
}

// Sine
export function InSine(t: number) {
	return 1 - Math.cos(PI_OVER_TWO * t);
}

export function OutSine(t: number) {
	return Math.sin(PI_OVER_TWO * t);
}

export function InOutSine(t: number) {
	if (t < 0.5) {
		return (1 - Math.cos(PI * t)) / 2;
	} else {
		return (1 + Math.sin(PI * (t - 0.5))) / 2;
	}
}

// Circular
export function InCirc(t: number) {
	return 1 - Math.sqrt(1 - Math.pow(t, 2));
}

export function OutCirc(t: number) {
	return Math.sqrt(1 - Math.pow(1 - t, 2));
}

export function InOutCirc(t: number) {
	if (t < 0.5) {
		return (1 - Math.sqrt(1 - 4 * t * t)) / 2;
	} else {
		return (1 + Math.sqrt(-3 + 8 * t - 4 * t * t)) / 2;
	}
}
