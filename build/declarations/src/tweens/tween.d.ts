import { ISequence } from '../core/interfaces/ISequence';
import { ITween } from '../core/interfaces/ITween';
import { EasingType } from '../easing/easingType';
import { BaseTween } from './baseTween';
/**
 * Tween: Used to animate values of an object
 *
 * @export
 * @class Tween
 * @extends {BaseTween}
 * @implements {ITween}
 */
export declare class Tween extends BaseTween<Tween> implements ITween {
    private obj;
    private readonly prop;
    private f;
    private t;
    private cf;
    private ct;
    private steps;
    private relative;
    private ease;
    private p;
    private v;
    private remains;
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
    private tick;
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
     * Compute the properties
     *
     * @private
     */
    private updateProp;
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
