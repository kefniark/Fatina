import { ITweenControl } from './ITweenControl';

export interface ITweenPlayable extends ITweenControl {
	OnStart(cb: () => void): void;
	OnUpdate(cb: (dt: number, progress: number) => void): void;
	OnKilled(cb: () => void): void;
	OnComplete(cb: () => void): void;
}
