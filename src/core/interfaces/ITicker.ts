import { ITweenControl } from './ITweenControl';

export interface ITicker extends ITweenControl {
	AddTickListener(cb: (dt: number) => void): void;
	RemoveTickListener(cb: (dt: number) => void): void;
}
