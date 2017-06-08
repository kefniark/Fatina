import { IControl } from './IControl';
import { State } from '../enum/state';

export interface IPlayable extends IControl {
	state: State;

	OnStart(cb: () => void): void;
	OnUpdate(cb: (dt: number, progress: number) => void): void;
	OnKilled(cb: () => void): void;
	OnComplete(cb: () => void): void;
}
