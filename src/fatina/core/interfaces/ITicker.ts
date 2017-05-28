import { IControl } from './IControl';
import { ITween } from './ITween';
import { ISequence } from './ISequence';

export interface ITicker extends IControl {
	AddTickListener(cb: (dt: number) => void): void;
	RemoveTickListener(cb: (dt: number) => void): void;

	Clean(data: (ITween | ISequence)[]): void;
}
