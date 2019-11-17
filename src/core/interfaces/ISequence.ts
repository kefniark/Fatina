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
	/**
	 * Number of tween in this sequence
	 * @readonly
	 * @type {number}
	 */
	readonly count: number;

	/**
	 * @inheritdoc
	 */
	start(): ISequence;
	/**
	 * @inheritdoc
	 */
	setParent(ticker: ITicker): ISequence;
	setTimescale(scale: number): ISequence;
	setLoop(loop: number): ISequence;
	setSettings(settings: ISettings): ISequence;

	append(tween: ITween | ISequence): ISequence;
	appendCallback(cb: () => void): ISequence;
	appendInterval(duration: number): ISequence;
	prepend(tween: ITween| ISequence): ISequence;
	prependCallback(cb: () => void): ISequence;
	prependInterval(duration: number): ISequence;
	join(tween: ITween | ISequence): ISequence;

	/**
	 * Callback called when the sequence is starting
	 *
	 * @param {() => void} cb
	 */
	onStart(cb: () => void): ISequence;
	/**
	 * Callback called when the sequence is restarted
	 *
	 * @param {() => void} cb
	 */
	onRestart(cb: () => void): ISequence;
	/**
	 * Callback called when the sequence is updated
	 *
	 * @param {(dt: number, progress: number) => void} cb
	 */
	onUpdate(cb: (dt: number, progress: number) => void): ISequence;
	/**
	 * Callback called when the sequence is killed
	 *
	 * @param {() => void} cb
	 */
	onKilled(cb: () => void): ISequence;
	/**
	 * Callback called when the sequence is complete
	 *
	 * @param {() => void} cb
	 */
	onComplete(cb: () => void): ISequence;
	/**
	 * Callback called when a step start
	 *
	 * @param {() => void} cb
	 */
	onStepStart(cb: (tween: ITween | IPlayable) => void): ISequence;
	/**
	 * Callback called when a step ends
	 *
	 * @param {() => void} cb
	 */
	onStepEnd(cb: (index: ITween | IPlayable) => void): ISequence;
}
