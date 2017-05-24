import { ITweenControl } from './ITweenControl';
import { ITicker } from './ITicker';
import { ITweener } from './ITweener';
import { ITweenPlayable } from './ITweenPlayable';

export interface ITweenSequence extends ITweenControl {
	SetParent(ticker: ITicker): ITweenSequence;

	OnStart(cb: () => void): ITweenSequence;
	OnStepStart(cb: (tween: ITweener | ITweenPlayable) => void): ITweenSequence;
	OnStepEnd(cb: (index: ITweener | ITweenPlayable) => void): ITweenSequence;
	OnUpdate(cb: (dt: number, progress: number) => void): ITweenSequence;
	OnKilled(cb: () => void): ITweenSequence;
	OnComplete(cb: () => void): ITweenSequence;

	Append(tween: ITweener): ITweenSequence;
	AppendCallback(cb: () => void): ITweenSequence;
	AppendInterval(duration: number): ITweenSequence;
	Prepend(tween: ITweener): ITweenSequence;
	PrependCallback(cb: () => void): ITweenSequence;
	PrependInterval(duration: number): ITweenSequence;
	Join(tween: ITweener): ITweenSequence;
}
