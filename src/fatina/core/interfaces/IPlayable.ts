import { IControl } from './IControl';
import { State } from '../enum/state';

export interface IPlayable extends IControl {
	state: State;
}
