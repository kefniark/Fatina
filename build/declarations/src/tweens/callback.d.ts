import { IPlayable } from '../core/interfaces/IPlayable';
import { BaseTween } from './baseTween';
/**
 * Fake tween used to append or join callback in a sequence
 *
 * @export
 * @class Callback
 * @extends {BaseTween}
 * @implements {IPlayable}
 */
export declare class Callback extends BaseTween<Callback> implements IPlayable {
    private readonly callback;
    constructor(cb: () => void);
    private tick;
}
