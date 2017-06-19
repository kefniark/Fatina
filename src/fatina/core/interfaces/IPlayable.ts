import { IControl } from './IControl';
import { State } from '../enum/state';
import { ITicker } from './ITicker';

/**
 * Interface used for pseudo tween (delay / callbacks)
 *
 * @export
 * @interface IPlayable
 * @extends {IControl}
 */
export interface IPlayable extends IControl {
	state: State;

	SetParent(ticker: ITicker): IPlayable;
	Start(): IPlayable;
	SetLoop(loop: number): IPlayable;
	OnStart(cb: () => void): IPlayable;
	OnRestart(cb: () => void): IPlayable;
	OnUpdate(cb: (dt: number, progress: number) => void): IPlayable;
	OnKilled(cb: () => void): IPlayable;
	OnComplete(cb: () => void): IPlayable;
}
