import { EasingType } from '../../easing/easingType';
import { Log } from '../enum/log';
import { IControl } from './IControl';
import { ISequence } from './ISequence';
import { ITicker } from './ITicker';

/**
 * Interface used by tweens
 *
 * @export
 * @interface ITween
 * @extends {IControl}
 */
export interface ITween extends IControl {
	Init(object: any, properties: string[]): void;
	Start(): ITween;
	From(from: any): ITween;
	To(to: any, duration: number): ITween;
	Modify(diff: any, updateTo: boolean): void;
	Reverse(): void;
	Yoyo(time: number): ITween;

	SetParent(ticker: ITicker): ITween;
	SetLoop(loop: number): ITween;
	SetSteps(steps: number): ITween;
	SetRelative(relative: boolean): ITween;
	SetEasing(type: EasingType | string): ITween;
	SetTimescale(scale: number): ITween;
	ToSequence(): ISequence;
	SetSafe(safe: boolean): ITween;
	SetLog(level: Log): ITween;

	OnStart(cb: () => void): ITween;
	OnUpdate(cb: (dt: number, progress: number) => void): ITween;
	OnRestart(cb: () => void): ITween;
	OnKilled(cb: () => void): ITween;
	OnComplete(cb: () => void): ITween;
}
