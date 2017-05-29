import { EasingType } from '../enum/EasingType';
import { IControl } from './IControl';
import { ITicker } from './ITicker';
import { ISequence } from './ISequence';

export interface ITween extends IControl {
	Default(): void;
	Init(object: any, properties: string[]): void;
	Start(): ITween;
	From(from: any): ITween;
	To(to: any, duration: number): ITween;

	SetParent(ticker: ITicker): ITween;
	SetLoop(loop: number): ITween;
	SetRelative(relative: boolean): ITween;
	SetEasing(type: EasingType | string): ITween;
	SetTimescale(scale: number): ITween;
	ToSequence(): ISequence;

	OnStart(cb: () => void): ITween;
	OnUpdate(cb: (dt: number, progress: number) => void): ITween;
	OnKilled(cb: () => void): ITween;
	OnComplete(cb: () => void): ITween;
}
