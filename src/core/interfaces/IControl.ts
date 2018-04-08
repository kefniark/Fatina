import { State } from '../enum/state';

/**
 * Base interface almost shared by everything (ticker, tween, sequence, ...)
 *
 * @export
 * @interface IControl
 */
export interface IControl {
	elapsed: number;
	duration: number;
	state: State;
	isIdle: boolean;
	isRunning: boolean;
	isFinished: boolean;
	isPaused: boolean;

	start(): void;
	pause(): void;
	resume(): void;
	kill(): void;
	reset(): void;
	skip(finalValue?: boolean): void;
}
