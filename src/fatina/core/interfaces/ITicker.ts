import { IControl } from './IControl';

/**
 * Interface used by any ticker (ticker, sequence)
 *
 * @export
 * @interface ITicker
 * @extends {IControl}
 */
export interface ITicker extends IControl {
	AddTickListener(cb: (dt: number) => void): void;
	RemoveTickListener(cb: (dt: number) => void): void;
}
