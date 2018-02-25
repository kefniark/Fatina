import { Log } from '../enum/log';
import { IControl } from './IControl';
import { IPlayable } from './IPlayable';
import { ITicker } from './ITicker';
import { ITween } from './ITween';
import { ISettings } from './ISettings';

/**
 * Interface used by Sequence
 *
 * @export
 * @interface ISequence
 * @extends {IControl}
 */
export interface ISequence extends IControl {
	Count: number;
	Start(): ISequence;
	SetParent(ticker: ITicker): ISequence;
	SetTimescale(scale: number): ISequence;
	SetLoop(loop: number): ISequence;
	SetSettings(settings: ISettings): ISequence;

	Append(tween: ITween | ISequence): ISequence;
	AppendCallback(cb: () => void): ISequence;
	AppendInterval(duration: number): ISequence;
	Prepend(tween: ITween| ISequence): ISequence;
	PrependCallback(cb: () => void): ISequence;
	PrependInterval(duration: number): ISequence;
	Join(tween: ITween | ISequence): ISequence;

	OnStart(cb: () => void): ISequence;
	OnRestart(cb: () => void): ISequence;
	OnStepStart(cb: (tween: ITween | IPlayable) => void): ISequence;
	OnStepEnd(cb: (index: ITween | IPlayable) => void): ISequence;
	OnUpdate(cb: (dt: number, progress: number) => void): ISequence;
	OnKilled(cb: () => void): ISequence;
	OnComplete(cb: () => void): ISequence;
}
