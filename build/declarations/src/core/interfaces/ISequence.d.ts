import { IControl } from './IControl';
import { IPlayable } from './IPlayable';
import { ISettings } from './ISettings';
import { ITicker } from './ITicker';
import { ITween } from './ITween';
/**
 * Interface used by Sequence
 *
 * @export
 * @interface ISequence
 * @extends {IControl}
 */
export interface ISequence extends IControl {
    count: number;
    start(): ISequence;
    setParent(ticker: ITicker): ISequence;
    setTimescale(scale: number): ISequence;
    setLoop(loop: number): ISequence;
    setSettings(settings: ISettings): ISequence;
    append(tween: ITween | ISequence): ISequence;
    appendCallback(cb: () => void): ISequence;
    appendInterval(duration: number): ISequence;
    prepend(tween: ITween | ISequence): ISequence;
    prependCallback(cb: () => void): ISequence;
    prependInterval(duration: number): ISequence;
    join(tween: ITween | ISequence): ISequence;
    onStart(cb: () => void): ISequence;
    onRestart(cb: () => void): ISequence;
    onStepStart(cb: (tween: ITween | IPlayable) => void): ISequence;
    onStepEnd(cb: (index: ITween | IPlayable) => void): ISequence;
    onUpdate(cb: (dt: number, progress: number) => void): ISequence;
    onKilled(cb: () => void): ISequence;
    onComplete(cb: () => void): ISequence;
}
