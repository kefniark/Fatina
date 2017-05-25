import { EasingType } from '../enum/EasingType';
import { ITweenControl } from './ITweenControl';
import { ITicker } from './ITicker';

export interface ITweener extends ITweenControl {
	From(from: any): ITweener;
	To(to: any, duration: number): ITweener;

	SetParent(ticker: ITicker): ITweener;
	SetLoop(loop: number): ITweener;
	SetRelative(relative: boolean): ITweener;
	SetEasing(type: EasingType | string, args?: any): ITweener;
	SetTimescale(scale: number): ITweener;

	OnStart(cb: () => void): ITweener;
	OnUpdate(cb: (dt: number, progress: number) => void): ITweener;
	OnKilled(cb: () => void): ITweener;
	OnComplete(cb: () => void): ITweener;
}
