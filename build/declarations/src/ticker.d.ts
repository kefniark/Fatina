import { State } from './core/enum/state';
import { ITicker } from './core/interfaces/ITicker';
/**
 * Main Fatina Ticker
 * Parent of all the normal tween and sequence
 *
 * @export
 * @class Ticker
 * @extends {EventList}
 * @implements {ITicker}
 */
export declare class Ticker implements ITicker {
    state: State;
    private timescale;
    elapsed: number;
    duration: number;
    private tickCb;
    private readonly ticks;
    private readonly newTicks;
    private parent;
    private dt;
    setParent(parent: ITicker, tick: (dt: number) => void): void;
    /**
     * Method used to change the timescale
     *
     * @param {number} scale
     *
     * @memberOf Ticker
     */
    setTimescale(scale: number): void;
    /**
     * Method used by the child to be updated
     *
     * @param {(dt: number) => void} cb
     *
     * @memberOf Ticker
     */
    addTick(cb: (dt: number) => void): void;
    /**
     * Method used by the child to not receive update anymore
     *
     * @param {(dt: number) => void} cb
     *
     * @memberOf Ticker
     */
    removeTick(cb: (dt: number) => void): void;
    /**
     * Method used to tick all the child (tick listeners)
     *
     * @param {number} dt
     * @returns
     *
     * @memberOf Ticker
     */
    tick(dt: number): void;
    start(): void;
    pause(): void;
    resume(): void;
    kill(): void;
    skip(): void;
    reset(): void;
    readonly isIdle: boolean;
    readonly isRunning: boolean;
    readonly isFinished: boolean;
    readonly isPaused: boolean;
}
