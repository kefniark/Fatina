import { IControl } from './IControl';

export interface IPlayable extends IControl {
	OnStart(cb: () => void): void;
	OnUpdate(cb: (dt: number, progress: number) => void): void;
	OnKilled(cb: () => void): void;
	OnComplete(cb: () => void): void;
}
