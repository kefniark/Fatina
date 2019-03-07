import { EasingType } from '../../easing/easingType';
import { IControl } from './IControl';
import { ISequence } from './ISequence';
import { ISettings } from './ISettings';
import { ITicker } from './ITicker';
/**
 * Interface used by tweens
 *
 * @export
 * @interface ITween
 * @extends {IControl}
 */
export interface ITween extends IControl {
    init(object: any): void;
    start(): ITween;
    from(from: any): ITween;
    to(to: any, duration: number): ITween;
    modify(diff: any, updateTo: boolean): void;
    reverse(): void;
    yoyo(time: number): ITween;
    setParent(ticker: ITicker): ITween;
    setLoop(loop: number): ITween;
    setSteps(steps: number): ITween;
    setRelative(relative: boolean): ITween;
    setEasing(type: EasingType | string): ITween;
    setSettings(settings: ISettings): ITween;
    setTimescale(scale: number): ITween;
    toSequence(): ISequence;
    onStart(cb: () => void): ITween;
    onUpdate(cb: (dt: number, progress: number) => void): ITween;
    onRestart(cb: () => void): ITween;
    onKilled(cb: () => void): ITween;
    onComplete(cb: () => void): ITween;
}
