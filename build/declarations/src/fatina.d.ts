import { Log } from './core/enum/log';
import { IControl } from './core/interfaces/IControl';
import { IPlayable } from './core/interfaces/IPlayable';
import { IPlugin } from './core/interfaces/IPlugin';
import { ISequence } from './core/interfaces/ISequence';
import { ITicker } from './core/interfaces/ITicker';
import { ITween } from './core/interfaces/ITween';
import { Ticker } from './ticker';
import { Sequence } from './tweens/sequence';
import { Tween } from './tweens/tween';
/**
 * Main class exposed as fatina library
 *
 * @export
 * @class Fatina
 */
export declare class Fatina {
    plugin: any;
    private readonly loadedPlugins;
    private readonly eventCreated;
    private readonly settings;
    time: number;
    private dt;
    private lastTime;
    private initialized;
    manager: Ticker;
    readonly elapsed: number;
    readonly mainTicker: ITicker;
    /**
     * Method used when Fatina is used for the first time.
     * Can take few ms. (pool initialization & object creation)
     *
     * @export
     * @param {boolean} [disableAutoTick]
     * @returns {boolean}
     */
    init(disableAutoTick?: boolean): boolean;
    /**
     * Used to change the timescale of the whole game
     *
     * @export
     * @param {number} scale
     */
    setTimescale(scale: number): void;
    /**
     * This method pause the update loop (update are not called anymore)
     *
     * @export
     */
    pause(): void;
    /**
     * This method resume the update loop (works only if the game was paused before)
     *
     * @export
     */
    resume(): void;
    /**
     * This method kill the main ticker, the pool of tween and stop any requestAnimationFrame
     *
     * @export
     */
    destroy(): void;
    /**
     * Method used to tick all the child (tween or sequence)
     * This takes cares of recycling the old tween/sequence
     *
     * @export
     * @param {number} timestamp
     * @returns {*}
     */
    update(timestamp: number): any;
    /**
     * Helper to create a tween (use the tween pool)
     *
     * @export
     * @param {*} obj
     * @returns {ITween}
     */
    tween(obj: any): ITween;
    /**
     * Helper to create a Sequence (use the sequence pool)
     *
     * @export
     * @param {(Tween[] | Sequence[])} [list]
     * @returns {ISequence}
     */
    sequence(list?: Tween[] | Sequence[] | IPlayable[]): ISequence;
    /**
     * Helper to create a Delay
     *
     * @export
     * @param {number} duration
     * @returns {IPlayable}
     */
    delay(duration: number): IPlayable;
    /**
     * Helper used to replace usage of normal js setTimeout() by a tween
     * https://www.w3schools.com/jsref/met_win_settimeout.asp
     *
     * @export
     * @param {() => void} fn
     * @param {number} duration
     * @returns {IPlayable}
     */
    setTimeout(fn: () => void, duration: number): IPlayable;
    /**
     * Helper used to replace usage of normal js setInterval() by a tween
     * https://www.w3schools.com/jsref/met_win_setinterval.asp
     *
     * @export
     * @param {() => void} fn
     * @param {number} duration
     * @returns {IPlayable}
     */
    setInterval(fn: () => void, duration: number): IPlayable;
    /**
     * Private method to set common data to every object (the parent ticker, safe mode, verbose mode)
     *
     * @param {(IPlayable | ITween | ISequence)} obj
     */
    private addContext;
    /**
     * Create or Get a ticker with a defined name
     * This ticker is a child of the main ticker
     *
     * @export
     * @param {string} name
     * @returns {ITicker}
     */
    ticker(): ITicker;
    private updateLoop;
    /**
     * Initialize a plugin by passing fatina object to it
     *
     * @export
     * @param {IPlugin} newPlugin
     */
    loadPlugin(newPlugin: IPlugin): void;
    private info;
    private emit;
    private emitCreated;
    /**
     * Add a listener method on tween/sequence creation
     *
     * @export
     * @param {(control: IControl) => void} cb
     */
    addListenerCreated(cb: (control: IControl) => void): void;
    /**
     * Remove a listener method on tween/sequence creation
     *
     * @export
     * @param {(control: IControl) => void} cb
     */
    removeListenerCreated(cb: (control: IControl) => void): void;
    /**
     * This method is used to change the log level
     *
     * @export
     * @param {Log} level
     */
    setLog(level: Log): void;
    /**
     * This method is used to enable / disable the callback try/catch
     *
     * @export
     * @param {boolean} isSafe
     */
    setSafe(isSafe: boolean): void;
}
