export const plugin: any;
export const time: number;
export const manager: Ticker;
export const elapsed: number;
export const mainTicker: ITicker;

/**
* Method used when Fatina is used for the first time.
* Can take few ms. (pool initialization & object creation)
*
* @export
* @param {boolean} [disableAutoTick]
* @returns {boolean}
*/
export function init(disableAutoTick?: boolean): boolean;

/**
* Used to change the timescale of the whole game
*
* @export
* @param {number} scale
*/
export function setTimescale(scale: number): void;

/**
* This method pause the update loop (update are not called anymore)
*
* @export
*/
export function pause(): void;

/**
* This method resume the update loop (works only if the game was paused before)
*
* @export
*/
export function resume(): void;

/**
* This method kill the main ticker, the pool of tween and stop any requestAnimationFrame
*
* @export
*/
export function destroy(): void;

/**
* Method used to tick all the child (tween or sequence)
* This takes cares of recycling the old tween/sequence
*
* @export
* @param {number} timestamp
* @returns {*}
*/
export function update(timestamp: number): any;

/**
* Helper to create a tween (use the tween pool)
*
* @export
* @param {*} obj
* @returns {ITween}
*/
export function tween(obj: any): ITween;

/**
* Helper to create a Sequence (use the sequence pool)
*
* @export
* @param {(Tween[] | Sequence[])} [list]
* @returns {ISequence}
*/
export function sequence(list?: Tween[] | Sequence[] | IPlayable[]): ISequence;

/**
* Helper to create a Delay
*
* @export
* @param {number} duration
* @returns {IPlayable}
*/
export function delay(duration: number): IPlayable;

/**
* Helper used to replace usage of normal js setTimeout() by a tween
* https://www.w3schools.com/jsref/met_win_settimeout.asp
*
* @export
* @param {() => void} fn
* @param {number} duration
* @returns {IPlayable}
*/
export function setTimeout(fn: () => void, duration: number): IPlayable;

/**
* Helper used to replace usage of normal js setInterval() by a tween
* https://www.w3schools.com/jsref/met_win_setinterval.asp
*
* @export
* @param {() => void} fn
* @param {number} duration
* @returns {IPlayable}
*/
export function setInterval(fn: () => void, duration: number): IPlayable;

/**
* Create or Get a ticker with a defined name
* This ticker is a child of the main ticker
*
* @export
* @param {string} name
* @returns {ITicker}
*/
export function ticker(): ITicker;

/**
* Initialize a plugin by passing fatina object to it
*
* @export
* @param {IPlugin} newPlugin
*/
export function loadPlugin(newPlugin: IPlugin): void;

/**
* Add a listener method on tween/sequence creation
*
* @export
* @param {(control: IControl) => void} cb
*/
export function addListenerCreated(cb: (control: IControl) => void): void;

/**
* Remove a listener method on tween/sequence creation
*
* @export
* @param {(control: IControl) => void} cb
*/
export function removeListenerCreated(cb: (control: IControl) => void): void;

/**
* This method is used to change the log level
*
* @export
* @param {Log} level
*/
export function setLog(level: Log): void;

/**
* This method is used to enable / disable the callback try/catch
*
* @export
* @param {boolean} isSafe
*/
export function setSafe(isSafe: boolean): void;

/**
  * Enum use to set the verbosity level of fatina and tweens
  *
  * @export
  * @enum {number}
  */
export const enum Log {
	None = 0,
	Info = 1,
	Debug = 2
}

/**
  * Base interface almost shared by everything (ticker, tween, sequence, ...)
  *
  * @export
  * @interface IControl
  */
export interface IControl {
	elapsed: number;
	duration: number;
	state: State;
	isIdle: boolean;
	isRunning: boolean;
	isFinished: boolean;
	isPaused: boolean;
	start(): void;
	pause(): void;
	resume(): void;
	kill(): void;
	reset(): void;
	skip(finalValue?: boolean): void;
}

/**
  * Interface used for pseudo tween (delay / callbacks)
  *
  * @export
  * @interface IPlayable
  * @extends {IControl}
  */
export interface IPlayable extends IControl {
	state: State;
	setParent(ticker: ITicker): IPlayable;
	start(): IPlayable;
	setLoop(loop: number): IPlayable;
	setSettings(settings: ISettings): IPlayable;
	onStart(cb: () => void): IPlayable;
	onRestart(cb: () => void): IPlayable;
	onUpdate(cb: (dt: number, progress: number) => void): IPlayable;
	onKilled(cb: () => void): IPlayable;
	onComplete(cb: () => void): IPlayable;
}

/**
  * Interface used to extend functionalities through plugin
  *
  * @export
  * @interface IPlugin
  */
export interface IPlugin {
	readonly name: string;
	init(fatina: any): void;
}

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

/**
  * Interface used by any ticker (ticker, sequence)
  *
  * @export
  * @interface ITicker
  * @extends {IControl}
  */
export interface ITicker extends IControl {
	addTick(cb: (dt: number) => void): void;
	removeTick(cb: (dt: number) => void): void;
	setTimescale(scale: number): void;
}

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

/**
    * Main Fatina Ticker
    * Parent of all the normal tween and sequence
    *
    * @export
    * @class Ticker
    * @extends {EventList}
    * @implements {ITicker}
    */
export class Ticker implements ITicker {
	state: State;
	elapsed: number;
	duration: number;
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
export class Sequence extends BaseTween<Sequence> implements ISequence, ITicker, IPlayable {
	readonly count: number;
	constructor(tweens?: ITween[] | ISequence[] | IPlayable[]);
	protected loopInit(): void;
	addTick(cb: (dt: number) => void): void;
	removeTick(cb: (dt: number) => void): void;
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

/**
    * Tween: Used to animate values of an object
    *
    * @export
    * @class Tween
    * @extends {BaseTween}
    * @implements {ITween}
    */
export class Tween extends BaseTween<Tween> implements ITween {
	constructor(object: any);
	/**
		* Used to define the object and the properties modified by this tween
		*
		* @param {*} object
		*
		* @memberOf Tween
		*/
	init(object: any): void;
	/**
		* Method used on start to check the values of this tween
		*
		* @protected
		*
		* @memberOf Tween
		*/
	protected validate(): void;
	/**
		* Method used to calculate currentFrom/currentTo based on the config
		*
		* @protected
		*
		* @memberOf Tween
		*/
	protected check(): void;
	/**
		* Method used to set the values at the beginning of the tween
		*
		* @param {*} from
		* @returns {ITween}
		*
		* @memberOf Tween
		*/
	from(from: any): ITween;
	/**
		* Method used to set the values at the end of the tween
		*
		* @param {*} to
		* @param {number} duration
		* @returns {ITween}
		*
		* @memberOf Tween
		*/
	to(to: any, duration: number): ITween;
	/**
		* Method used to define if the tween as to work in relative or not
		*
		* @param {boolean} relative
		* @returns {ITween}
		*
		* @memberOf Tween
		*/
	setRelative(relative: boolean): ITween;
	/**
		* To apply a modifier on a current tween
		*
		* @param {*} diff
		* @param {boolean} updateTo
		*
		* @memberOf Tween
		*/
	modify(diff: any, updateTo: boolean): void;
	/**
		* Overwrite the Reset (just for yoyo)
		*
		* @param {boolean} [skipParent]
		* @memberOf Tween
		*/
	reset(skipParent?: boolean): void;
	/**
		* Method used to reverse the tween
		*
		* @memberOf Tween
		*/
	reverse(): void;
	/**
		* Method used to reverse the tween N times at the end
		*
		* @param {number} time
		* @returns {ITween}
		*
		* @memberOf Tween
		*/
	yoyo(time: number): ITween;
	/**
		* Method used to Quantify the tween value to a certain amount of steps
		*
		* @param {number} steps
		* @returns {ITween}
		*
		* @memberOf Tween
		*/
	setSteps(steps: number): ITween;
	/**
		* Method used to create a sequence with this tween as first value.
		* Usually used with .AppendInterval(1250) or .PrependInterval(160) to add a delay
		*
		* @returns {ISequence}
		*
		* @memberOf Tween
		*/
	toSequence(): ISequence;
	/**
		* Method used to set the type of easing for this tween
		*
		* @param {(EasingType | string)} type
		* @returns {ITween}
		*
		* @memberOf Tween
		*/
	setEasing(type: EasingType | string): ITween;
	/**
		* Method used when the tween is reset (loop)
		*
		* @protected
		*
		* @memberOf Tween
		*/
	protected loopInit(): void;
}

/**
  * Possible states of a Tween / Sequence
  *
  * @export
  * @enum {number}
  */
export const enum State {
	Idle = 0,
	Run = 1,
	Pause = 2,
	Finished = 3,
	Killed = 4
}

/**
  * Fatina Settings
  *
  * @export
  * @interface ISettings
  */
export interface ISettings {
	logLevel: Log;
	safe: boolean;
	smooth: boolean;
	maxFrameDt: number;
	maxFrameNumber: number;
	maxDt: number;
}

/**
  * List of all easing methods
  *
  * @export
  * @enum {number}
  */
export const enum EasingType {
	Linear = "linear",
	InQuad = "inQuad",
	OutQuad = "outQuad",
	InOutQuad = "inOutQuad",
	InCubic = "inCubic",
	OutCubic = "outCubic",
	InOutCubic = "inOutCubic",
	InQuart = "inQuart",
	OutQuart = "outQuart",
	InOutQuart = "inOutQuart",
	InSine = "inSine",
	OutSine = "outSine",
	InOutSine = "inOutSine",
	InCirc = "inCirc",
	OutCirc = "outCirc",
	InOutCirc = "inOutCirc",
	InQuint = "inQuint",
	OutQuint = "outQuint",
	InOutQuint = "inOutQuint",
	InExponential = "inExponential",
	OutExponential = "outExponential",
	InOutExponential = "inOutExponential",
	InElastic = "inElastic",
	OutElastic = "outElastic",
	InOutElastic = "inOutElastic",
	InBack = "inBack",
	OutBack = "outBack",
	InOutBack = "inOutBack",
	InBounce = "inBounce",
	OutBounce = "outBounce",
	InOutBounce = "inOutBounce"
}

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
export abstract class BaseTween<T extends BaseTween<any>> {
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

export interface ITweenProperty {
	original: number;
	value: number;
}

