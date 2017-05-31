import { TweenType } from '../enum/tweenType';

export interface IControl {
	Type: TweenType;
	Elapsed: number;
	Duration: number;

	IsRunning(): boolean;
	IsCompleted(): boolean;
	IsKilled(): boolean;

	Start(): void;
	Pause(): void;
	Resume(): void;
	Kill(): void;
	Reset(): void;
	Skip(): void;
}
