import { State } from '../enum/state';
import { IControl } from './IControl';
import { ISettings } from './ISettings';
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

	setParent(ticker: ITicker): IPlayable;
	start(): IPlayable;
	setLoop(loop: number): IPlayable;
	setSettings(settings: ISettings): IPlayable;

	onStart(cb: () => void): IPlayable;
	onRestart(cb: () => void): IPlayable;
	onUpdate(cb: (dt: number, progress: number) => void): IPlayable;
	onKilled(cb: () => void): IPlayable;
	onComplete(cb: () => void): IPlayable;
}
