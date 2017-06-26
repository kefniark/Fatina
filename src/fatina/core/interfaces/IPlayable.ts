import { Log } from '../enum/log';
import { State } from '../enum/state';
import { IControl } from './IControl';
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
	SetSafe(safe: boolean): IPlayable;
	SetLog(level: Log): IPlayable;
	OnStart(cb: () => void): IPlayable;
	OnRestart(cb: () => void): IPlayable;
	OnUpdate(cb: (dt: number, progress: number) => void): IPlayable;
	OnKilled(cb: () => void): IPlayable;
	OnComplete(cb: () => void): IPlayable;
}
