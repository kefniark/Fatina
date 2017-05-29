import { IControl } from './IControl';
import { ITicker } from './ITicker';
import { ITween } from './ITween';
import { IPlayable } from './IPlayable';

export interface ISequence extends IControl {
	Default(): void;
	Start(): ISequence;
	SetParent(ticker: ITicker): ISequence;
	SetTimescale(scale: number): ISequence;
	SetLoop(loop: number): ISequence;

	Append(tween: ITween): ISequence;
	AppendCallback(cb: () => void): ISequence;
	AppendInterval(duration: number): ISequence;
	Prepend(tween: ITween): ISequence;
	PrependCallback(cb: () => void): ISequence;
	PrependInterval(duration: number): ISequence;
	Join(tween: ITween): ISequence;

	OnStart(cb: () => void): ISequence;
	OnStepStart(cb: (tween: ITween | IPlayable) => void): ISequence;
	OnStepEnd(cb: (index: ITween | IPlayable) => void): ISequence;
	OnUpdate(cb: (dt: number, progress: number) => void): ISequence;
	OnKilled(cb: () => void): ISequence;
	OnComplete(cb: () => void): ISequence;
}
