import { IPlayable } from '../core/interfaces/IPlayable';
import { BaseTween } from './baseTween';
/**
 * Fake tween used to delay other tweens in a sequence
 *
 * @export
 * @class Delay
 * @extends {BaseTween}
 * @implements {IPlayable}
 */
export declare class Delay extends BaseTween<Delay> implements IPlayable {
    private remains;
    constructor(duration: number);
    private tick;
}
