import { Log } from '../core/enum/log';
import { State } from '../core/enum/state';
import { ISettings } from '../core/interfaces/ISettings';
import { ITicker } from '../core/interfaces/ITicker';
import { ITweenProperty } from '../core/interfaces/ITweenProperty';
/**
 * Shared behaviors between different types of tweens and sequence
 * Used mostly to manage:
 *  - events
 *  - state
 *  - loop and restart
 *
 * @export
 * @abstract
 * @class BaseTween
 */
export declare abstract class BaseTween<T extends BaseTween<any>> {
    protected events: {
        [id: string]: any;
    };
    elapsed: number;
    duration: number;
    timescale: number;
    state: State;
    protected loop: ITweenProperty | undefined;
    protected yo: ITweenProperty | undefined;
    protected parent: ITicker;
    protected tickCb: (dt: number) => void;
    private first;
    private settings?;
    readonly isIdle: boolean;
    readonly isRunning: boolean;
    readonly isFinished: boolean;
    readonly isPaused: boolean;
    /**
     * Method used to start a tween
     *
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    start(): T;
    /**
     * Reset a tween to be reusable (with start)
     *
     * @memberOf BaseTween
     */
    recycle(): void;
    /**
     * To Reset a Tween already finished (example looping sequence)
     *
     * @memberOf BaseTween
     */
    reset(skipParent?: boolean): void;
    /**
     * To immediately Reset a tween without stopping/restarting it
     * This is faster than calling manually Reset() & Start() & Tick()
     *
     * @param {number} dtRemains
     *
     * @memberOf BaseTween
     */
    resetAndStart(dtRemains: number): void;
    /**
     * Method used to define the ticker of this tween
     * When Fatina.Tween is used, the main ticker is automatically defined as parent
     *
     * @param {ITicker} ticker
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    setParent(ticker: ITicker): T;
    /**
     * Method used to change the timescale of the tween
     *
     * @param {number} scale
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    setTimescale(scale: number): T;
    /**
     * Method used to pause a tween or a sequence (only work if the tween runs)
     *
     * @returns {void}
     *
     * @memberOf BaseTween
     */
    pause(): void;
    /**
     * Method used to resume a tween or a sequence (only work if the tween is paused)
     *
     * @returns {void}
     *
     * @memberOf BaseTween
     */
    resume(): void;
    /**
     * Method used to Skip this tween or sequence and directly finish it
     *
     * @param {boolean} [finalValue]
     * @returns {void}
     * @memberOf BaseTween
     */
    skip(finalValue?: boolean): void;
    /**
     * Method used to Stop/Kill a tween or a sequence
     *
     * @returns {void}
     *
     * @memberOf BaseTween
     */
    kill(): void;
    /**
     * Method used to define how many time the tween has to loop
     * Extra: if -1 the tween will loop forever
     *
     * @param {number} loop
     * @returns {ITween}
     *
     * @memberOf Tween
     */
    setLoop(loop: number): T;
    setSettings(settings: ISettings): T;
    protected complete(): void;
    protected removeParent(): void;
    protected check(): void;
    protected validate(): void;
    protected loopInit(): void;
    protected info(level: Log, message: string, data?: any): void;
    private emit;
    protected emitEvent(listeners: any, args?: any): void;
    /**
     *  Callback called when the tween started
     *
     * @param {() => void} cb
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    onStart(cb: () => void): T;
    /**
     * Callback called when the tween restart (loop)
     *
     * @param {() => void} cb
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    onRestart(cb: () => void): T;
    /**
     * Callback called when the tween is updated
     *
     * @param {(dt: number, progress: number) => void} cb
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    onUpdate(cb: (dt: number, progress: number) => void): T;
    /**
     * Callback called when the tween is manually killed
     *
     * @param {() => void} cb
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    onKilled(cb: () => void): T;
    /**
     * Callback called when the tween is finished
     *
     * @param {() => void} cb
     * @returns {T}
     *
     * @memberOf BaseTween
     */
    onComplete(cb: () => void): T;
    protected onEvent(name: string, cb: any): T;
}
