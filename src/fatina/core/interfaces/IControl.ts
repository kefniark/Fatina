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

	Start(): void;
	Pause(): void;
	Resume(): void;
	Kill(): void;
	Reset(): void;
	Skip(): void;
}
