import { TweenType } from '../enum/tweenType';
import { State } from '../enum/state';

export interface IControl {
	type: TweenType;
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
