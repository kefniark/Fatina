import { IPlayable } from '../core/interfaces/IPlayable';
import { ISequence } from '../core/interfaces/ISequence';
import { ITicker } from '../core/interfaces/ITicker';
import { ITween } from '../core/interfaces/ITween';
import { BaseTween } from './baseTween';
/**
 * Sequence: used to animate other tweens or sequence
 * Can play them sequentially or in parallel
 *
 * @export
 * @class Sequence
 * @extends {BaseTween}
 * @implements {ISequence}
 * @implements {ITicker}
 * @implements {IPlayable}
 */
export declare class Sequence extends BaseTween<Sequence> implements ISequence, ITicker, IPlayable {
    private readonly evtTick;
    private readonly tweens;
    private index;
    private cur;
    private remains;
    readonly count: number;
    constructor(tweens?: ITween[] | ISequence[] | IPlayable[]);
    protected loopInit(): void;
    addTick(cb: (dt: number) => void): void;
    removeTick(cb: (dt: number) => void): void;
    private tick;
    private localTick;
    private nextTween;
    append(tween: ITween | ISequence): ISequence;
    appendCallback(cb: () => void): ISequence;
    appendInterval(duration: number): ISequence;
    prepend(tween: ITween | ISequence): ISequence;
    prependCallback(cb: () => void): ISequence;
    prependInterval(duration: number): ISequence;
    skip(finalValue?: boolean): void;
    kill(): void;
    join(tween: ITween | ISequence): ISequence;
    onStepStart(cb: (index: ITween | IPlayable) => void): ISequence;
    onStepEnd(cb: (index: ITween | IPlayable) => void): ISequence;
}
