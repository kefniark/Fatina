import { IControl } from './IControl';

export interface ITicker extends IControl {
	AddTickListener(cb: (dt: number) => void): void;
	RemoveTickListener(cb: (dt: number) => void): void;
}
