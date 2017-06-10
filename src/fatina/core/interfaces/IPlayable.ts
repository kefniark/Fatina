import { IControl } from './IControl';
import { State } from '../enum/state';

/**
 * Interface used for pseudo tween (delay / callbacks)
 *
 * @export
 * @interface IPlayable
 * @extends {IControl}
 */
export interface IPlayable extends IControl {
	state: State;
}
